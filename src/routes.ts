import { Router } from "express";
import FlightController from "./controllers/FlightController";

const routes = Router();

routes.post("/ping", (req, res) => {
  return res.status(200).send("pong!");
});

routes.get("/allFlights", FlightController.getFlights);

routes.get("/groupedFlights", FlightController.groupedFlights);

export default routes;
