import { AxiosError, AxiosResponse } from "axios";
import { Response } from "express";
import API from "../util/apis";

class Flight {
  // constructor(parameters: any) {}

  public get = async (id: number) => {}

  public getAll = async () => {
    return API.api123milhas.get("/flights").then(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        return Promise.reject({ msg: "Erro ao buscar voos.", error }); 
      }
    );
  }

  public getOutbound = async () => {
    return API.api123milhas.get("/flights?outbound=1").then(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        return Promise.reject({ msg: "Erro ao buscar voos de ida.", error });
      }
    );
  }

  public getInbound = async () => {
    return API.api123milhas.get("/flights?inbound=1").then(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        return Promise.reject({ msg: "Erro ao buscar voos de volta.", error });
      }
    );
  }

}

export default new Flight();