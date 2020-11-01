import { Request, Response } from "express";
import FlightModel from "../models/Flight";
import FlightTransformation from "../transformations/FlightTransformation";

class FlightController {
  /**
   * getFlights
   */
  public getFlights = async (req: Request, res: Response) => {
    const flights = await FlightModel.getAll();

    return res.status(200).json(flights);
  };

  /**
   * groupedFlights
   */
  public groupedFlights = async (req: Request, res: Response) => {
    const flights = await FlightModel.getAll();

    const outboundFlights = flights.filter((f: any) => f.outbound === 1);

    const inboundFlights = flights.filter((f: any) => f.inbound === 1);

    const flightsFares = outboundFlights.reduce(
      (acc: any, currentFlight: any) => {
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

    const formatedFlights = FlightTransformation.transform(flights, groupedFligts);

    return res.status(200).json(formatedFlights);
  };

  /**
   * getFLightsByFareAndPrice
   */
  public getFlightsByFareAndPrice = (
    fares: any,
    outboundFlights: any,
    inboundFlights: any
  ) => {
    let result: any = [];
    let i = 0;
    fares.forEach((fare: any) => {
      let prices: any = [];
      const outFlightsByFare = outboundFlights.filter(
        (f: any) => f.fare === fare
      );

      const inFlightsByFare = inboundFlights.filter(
        (f: any) => f.fare === fare
      );

      const distinctOutFlightsByPrice = this.getDistinctFlightsByPrice(
        outFlightsByFare
      );

      const distinctInFlightsByPrice = this.getDistinctFlightsByPrice(
        inFlightsByFare
      );

      distinctOutFlightsByPrice.forEach((outFlight: any) => {
        const groupedOutByPrice = this.groupFlightsByPrice(
          outFlightsByFare,
          outFlight
        );

        distinctInFlightsByPrice.forEach((inFlight: any) => {
          const groupedInByPrice = this.groupFlightsByPrice(
            inFlightsByFare,
            inFlight
          );
          i++;
          result = [
            ...result,
            {
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
   * groupFLightsByPrice
   */
  public groupFlightsByPrice(fligthsByFare: any, currentFlight: any): any {
    return fligthsByFare.reduce((acc: any, current: any) => {
      if (current.price === currentFlight.price) {
        if (!acc.length) return [{ id: current.id }];

        return [...acc, { id: current.id }];
      }

      return acc;
    }, []);
  }

  /**
   * getDistinctFlightsByPrice
   */
  public getDistinctFlightsByPrice(flights: any) {
    let prices: any = [];

    return flights.reduce((acc: any, f: any) => {
      if (!prices.includes(f.price)) {
        prices = [...prices, f.price];
        return acc.length ? [...acc, f] : [f];
      }
      return acc;
    }, []);
  }

}

export default new FlightController();
