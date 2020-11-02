import {
  IGroupedFlights,
  IFlight,
  IGroupFlight,
  ICheapest,
} from "../interfaces/flightInterface";

class FlightTransformation {
  /**
   * transform
   */
  public transform(
    flights: IFlight[],
    groups: IGroupFlight[]
  ): IGroupedFlights {
    const { cheapestPrice, cheapestGroup } = this.getCheapestGroup(groups);
    return {
      flights,
      groups: this.sortGroups(groups),
      totalGroups: groups.length,
      totalFlights: flights.length,
      cheapestPrice,
      cheapestGroup,
    };
  }

  /**
   * Busca o voo com menor preço.
   */
  public getCheapestGroup(flights: IGroupFlight[]): ICheapest {
    let aux = Number.MAX_VALUE;
    return flights.reduce((acc: ICheapest | any, flight: IGroupFlight) => {
      if (flight.totalPrice < aux) {
        aux = flight.totalPrice;
        return {
          cheapestPrice: flight.totalPrice,
          cheapestGroup: flight.uniqueId,
        };
      }

      return acc;
    }, {});
  }

  /**
   * Realiza a ordenação dos voos pelo preço.
   */
  public sortGroups(groups: IGroupFlight[]) {
    return groups.sort((a: IGroupFlight, b: IGroupFlight) => {
      if (a.totalPrice > b.totalPrice) {
        return 1;
      }
      if (a.totalPrice < b.totalPrice) {
        return -1;
      }
      return 0;
    });
  }
}

export default new FlightTransformation();