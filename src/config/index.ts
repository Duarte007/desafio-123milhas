const config = {
  port: process.env.PORT ? process.env.PORT : 4000,
  api123Milhas:
    process.env.ENDPOINT_API_123MILHAS || "http://prova.123milhas.net/api",
};

export default config;