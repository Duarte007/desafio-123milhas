**Utilizar API pelo docker**

> docker pull duarte007/api_123milhas_prod:latest

> docker run -p 4000:4000 duarte007/api_123milhas_prod

**Utilizar API pelo docker-compose**

Para utulizar a API com docker-compose basta utilizar o arquivo .yml `docker-compose-prod.yml`

> docker-compose -f docker-compose-prod.yml pull

> docker-compose -f docker-compose-prod.yml up -d

**Caso não possua docker**

> npm run dev (para rodar com nodemon)

ou

> npm run build

> npm run prod

**Como utilizar**

Por default a API roda na porta 4000, caso queira utilizá-la em outra porta
basta criar um arquivo .env na raiz do projeto e especificar a variável PORT.

Existem duas rodas disponíveis:

- /allFlights - Responsável por buscar todas as rotas, como a da API disponibilizada.

- /groupedFlights - Responsável por retornar os voos agrupados conforme proposto no desafio.