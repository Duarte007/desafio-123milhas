import { Request, Response } from "express";
import FlightModel from "../models/Flight";
import FlightTransformation from "../transformations/FlightTransformation";
import {
  IFlight,
  IGroupFlight,
  IIdFlight,
} from "../interfaces/flightInterface";

class FlightController {
  /**
   * Busca voos pela api da 123milhas
   */
  public getFlights = async (req: Request, res: Response) => {
    console.log("Buscando voos");
    const flights = await FlightModel.getAll();

    return res.status(200).json(flights);
  };

  /**
   * Busca voos pela api da 123milhas e faz o agrupamento proposto.
   * Foi feita a separação por voos de ida e voos de volta, depois houve a busca das
   * taxas dos voos de ida para criar os grupos.
   *  
   */
  public groupedFlights = async (req: Request, res: Response) => {
    console.log("Buscando voos agrupados");
    const flights = await FlightModel.getAll();

    const outboundFlights = flights.filter((f: IFlight) => f.outbound === 1);

    const inboundFlights = flights.filter((f: IFlight) => f.inbound === 1);

    const flightsFares = outboundFlights.reduce(
      (acc: any, currentFlight: IFlight) => {
        if (!acc.length) return [currentFlight.fare];
        if (!acc.includes(currentFlight.fare))
          return [...acc, currentFlight.fare];

        return acc;
      },
      []
    );

    const groupedFligts = this.getFlightsByFareAndPrice(
      flightsFares,
      outboundFlights,
      inboundFlights
    );

    const formatedFlights = FlightTransformation.transform(
      flights,
      groupedFligts
    );

    return res.status(200).json(formatedFlights);
  };

  /**
   * Função responsável pela lógica do agrupamento. Percorre todas as taxas 
   * e para cada taxa busca os voos, faz um distinct de voos por preço, busca
   * todos os voos com o mesmo preço (ida e volta), e então cria o grupo fazendo
   * todas as combinações possíveis.
   */
  public getFlightsByFareAndPrice = (
    fares: string[],
    outboundFlights: IFlight[],
    inboundFlights: IFlight[]
  ) => {
    let result: IGroupFlight[] = [];
    let i = 0;
    fares.forEach((fare: string) => {
      const outFlightsByFare = outboundFlights.filter(
        (f: IFlight) => f.fare === fare
      );

      const inFlightsByFare = inboundFlights.filter(
        (f: IFlight) => f.fare === fare
      );

      const distinctOutFlightsByPrice = this.getDistinctFlightsByPrice(
        outFlightsByFare
      );

      const distinctInFlightsByPrice = this.getDistinctFlightsByPrice(
        inFlightsByFare
      );

      distinctOutFlightsByPrice.forEach((outFlight: IFlight) => {
        const groupedOutByPrice = this.groupFlightsByPrice(
          outFlightsByFare,
          outFlight
        );

        distinctInFlightsByPrice.forEach((inFlight: IFlight) => {
          const groupedInByPrice = this.groupFlightsByPrice(
            inFlightsByFare,
            inFlight
          );
          i++;
          result = [
            ...result,
            {
              // Utilizei o id de forma dinâmica para não usar 
              // nenhum tipo de banco de dados para armazenamento.
              // Por isso também não disponibilizei nenhum tipo de filtro para
              // rota de agrupamento.
              uniqueId: i,
              totalPrice: outFlight.price + inFlight.price,
              outbound: groupedOutByPrice.length
                ? { ...groupedOutByPrice }
                : { outFlight },
              inbound: groupedInByPrice.length
                ? { ...groupedInByPrice }
                : { inFlight },
            },
          ];
        });
      });
    });
    return result;
  };

  /**
   * Realiza o agrupamento dos voos com mesmo preço.
   */
  public groupFlightsByPrice(
    fligthsByFare: IFlight[],
    currentFlight: IFlight
  ): IIdFlight[] {
    return fligthsByFare.reduce((acc: IIdFlight[], current: IFlight) => {
      if (current.price === currentFlight.price) {
        if (!acc.length) return [{ id: current.id }];

        return [...acc, { id: current.id }];
      }

      return acc;
    }, []);
  }

  /**
   * Retorna todos os voos com preços distintos.
   */
  public getDistinctFlightsByPrice(flights: IFlight[]) {
    let prices: number[] = [];

    return flights.reduce((acc: IFlight[], f: IFlight) => {
      if (!prices.includes(f.price)) {
        prices = [...prices, f.price];
        return acc.length ? [...acc, f] : [f];
      }
      return acc;
    }, []);
  }
}

export default new FlightController();
