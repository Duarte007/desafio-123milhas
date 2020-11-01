import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

import routes from "./routes";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json({ limit: "100kb" }));
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(helmet());
    this.express.use(
      rateLimit({
        windowMs: 3 * 60 * 1000, // 3 minutos
        max: 200,
        keyGenerator: function (req) {
          if (req.headers.authorization) {
            return req.headers.authorization;
          } else {
            return req.ip;
          }
        },
      })
    );
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
