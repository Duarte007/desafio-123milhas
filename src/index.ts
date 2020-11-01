import App from "./app";
import config from "./config";

const server = App.listen(config.port, async () => {
  console.log(`Api listening port ${config.port}`);
});

server.setTimeout(60 * 2000);
