const request = require("supertest");

const app = require("../app");
const UserModel = require("../models/userModel.js");

describe("Testes da API", () => {
  let token; // Para armazenar o token JWT

  let server;

  beforeAll((done) => {
    server = app.listen(8000, (err) => {
      if (err) return done(err);

      done();
    });
  });

  afterAll(async () => {
    // Remover os registros de usuário de teste
    await UserModel.deleteMany({ email: "novousuario@example.com" });

    server.close();
  });

  describe("test POST /api/users/", () => {
    test("Must register a new user", async () => {
      const response = await request(app)
        .post("/api/users/")
        .send({
          name: "Novo Usuário",
          email: "novousuario@example.com",
          password: "senha123",
        })
        .expect(201);

      expect(response.body).toHaveProperty("token");
      token = response.body.token;
    });

    test("Should fail to register new user", async () => {
      const response = await request(app)
        .post("/api/users/")
        .send({
          name: "Novo Usuário",
          email: "novousuario@example.com",
          password: "senha123",
        })
        .expect(400);

      expect(response.body.message).toBe("O usuário já existe.");
    });

    test("Should fail to register new user when missing fields", async () => {
      const response = await request(app)
        .post("/api/users/")
        .send({
          name: "Novo Usuário",
          password: "senha123",
        })
        .expect(400);

      expect(response.body.message).toBe("Por favor, adicione todos os campos");
    });
  });

  describe("test POST /api/users/login", () => {
    test("Must login successfully", async () => {
      const response = await request(app)
        .post("/api/users/login")
        .send({
          email: "novousuario@example.com",
          password: "senha123",
        })
        .expect(200);

      expect(response.body).toHaveProperty("token");
    });

    test("Should fail to login with invalid credentials", async () => {
      const response = await request(app)
        .post("/api/users/login")
        .send({
          email: "novousuario@example.com",
          password: "senha_incorreta",
        })
        .expect(400);

      expect(response.body).toHaveProperty("message");
    });
  });

  describe("test GET /api/users/me", () => {
    test("should return user data when authenticated", async () => {
      const response = await request(app)
        .get("/api/users/me")
        .set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("email");
    });

    test("should return an error when not authenticated", async () => {
      const response = await request(app).get("/api/users/me");

      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe("Não autorizado. Está sem token");
    });
  });
});
