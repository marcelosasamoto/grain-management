module.exports = {
  development: {
    username: "postgres",
    password: "senha123",
    database: "meubanco",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: "senha123",
    database: "meubanco_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: "senha123",
    database: "meubanco_prod",
    host: "127.0.0.1",
    dialect: "postgres"
  }
};
