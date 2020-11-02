export interface IFlight {
  id: number;
  cia: string;
  fare: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
  departureTime: string;
  arrivalTime: string;
  classService: number;
  price: number;
  tax: number;
  outbound: number;
  inbound: number;
  duration: string;
} 

export interface IGroupFlight {
  uniqueId: number;
  totalPrice: number;
  outbound: IIdFlight|any;
  inbound: IIdFlight|any;
  totalGroups?: number;
  totalFlights?: number;
  cheapestPrice?: number;
  cheapestGroup?: number;
}


export interface IGroupedFlights {
  flights: IFlight[];
  groups: IGroupFlight[];
  totalGroups: number;
  totalFlights: number;
  cheapestPrice: number;
  cheapestGroup: number;
}

export interface ICheapest {
  cheapestPrice: number;
  cheapestGroup: number;
}

export interface IIdFlight { 
  [index: number]: {id?: number};
}