# cypress_pageObject
Projeto desenvolvido em Cypress. 

Baixar yarn
Yarn install
Yarn typeorm migration:run

Criar pasta test
yarn init (na pasta test)

yarn add cypress@9.5.0

npx cypress open -- preparar o projeto para trabalhar com o framework e também chamar para abrir a pagina para rodar testes. 

arquivo cypress.json estão as configs basicas do projeto.

Para iniciar o teste > Usar a pagina de testes do cypress.

no arquivo plugins -- index.js tem a integração e exclusão dos dados em banco


cd/apps/api Iniciar API -- yarn start
cd/apps/web Iniciar WEB -- yarn start
cd/tests Iniciar testes -- npx cypress open


Instalar xpath
yarn add cypress-xpath
yarn add moment -D
yarn add @faker-js/faker

Erro de API:
  code: 'EAUTH',
  response: '535 Authentication failed',
  responseCode: 535,
  command: 'AUTH PLAIN'

Resolver: Na web entrar no site: https://ethereal.email/
Criar uma nova conta.
Depois no arquivo mudar a conta criada por essa nova 
Arquivo: apps\api\dist\shared\container\providers\MailProvider\implementations\EtherealMailProvider.js




