# Componentes

 - [API](api/)<br>
 - [Micro-serviço de Produto](product-service/)<br>
 - [Micro-serviço de Carrinho de Compras](cart-service/)

Foi criado um docker compose de forma a facilitar a inicialização da API, dos micro-serviços e das bases de dados.

Para executar o docker compose basta ter o Docker instalado na máquina e executar o seguinte comando na raiz do projeto:

```bash
docker-compose up
```

## API Endpoints

### Produtos

<b>Obter todos os produtos</b>

```bash
@GET
http://localhost:3000/products
```

<b>Obter produto</b>

```bash
@GET
http://localhost:3000/products/:id
```

### Carrinho de Compras

<b>Obter carrinho de compras</b>

```bash
@GET
http://localhost:3000/cart/:userId
```

<b>Adicionar produto ao carrinho de compras</b>

```bash
@POST
localhost:3000/cart/:userId/product/:productId
```

<b>Remover produto do carrinho de compras</b>

```bash
@DELETE
localhost:3000/cart/:userId/product/:productId
```