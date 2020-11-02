**Utilizar API pelo docker**

> docker pull duarte007/api_123milhas_prod:latest
> docker run -p 4000:4000 duarte007/api_123milhas_prod

**Caso não possua docker**

> npm run dev (para rodar com nodemon)

ou

> npm run build
> npm run prod

**Como utilizar**

Por default a API roda na porta 4000, caso queira utilizá0la em outra porta
basta criar um arquivo .env na raiz do projeto e especificar a variável PORT.

Existem duas rodas disponíveis:

- /allFlights - Responsável por buscar todas as rotas, como a da API disponibilizada.

- /groupedFlights - Responsável por retornar os voos agrupados conforme proposto no desafio.