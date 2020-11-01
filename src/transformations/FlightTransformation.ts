class FlightTransformation {
  /**
   * transform
   */
  public transform(flights: any, groups: any) {
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
   * getCheapestGroup
   */
  public getCheapestGroup(flights: any) {
    let aux = Number.MAX_VALUE;
    return flights.reduce((acc: any, flight: any) => {
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
   * sortGroups
   */
  public sortGroups(groups: any) {
    return groups.sort((a: any, b: any) => {
      if (a.totalPrice > b.totalPrice) {
        return 1;
      }
      if (a.totalPrice < b.totalPrice) {
        return -1;
      }
      return 0;
    })
  }
}

export default new FlightTransformation();