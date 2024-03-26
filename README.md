## Executando Front-end
```sh
npm install
npm run dev
```
Acesse http://localhost:3000 para visualizar a aplicação no front.
## Executando Back-end na versão web
![Cover](./.github/runBackInWeb.png)
```sh
npm install
npm run dev
```
A aplicação server roda na porta http://localhost:3333.

## Executando Mobile
![Cover](./.github/runBackInMobile.png)
E escolha a plataforma de sua preferencia para rodar a aplicação.
```sh
npm install
npm run start
```

## Executando Back-end na versão Mobile
![Cover](./.github/runBackInMobile.png)
Adicione a linha     
```sh
host: '0.0.0.0',
```

na função app.listen em server.ts dentro de src
```sh
app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
```

```sh
npm install
npm run dev
```



E escolha a plataforma de sua preferencia para rodar a aplicação.