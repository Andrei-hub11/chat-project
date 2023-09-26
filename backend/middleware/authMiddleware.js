const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Verifica se há um cabeçalho de autorização nas requisições e se ele começa com "Bearer".
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Encontra o usuário no banco de dados com base no ID decodificado e exclui o campo de senha.
      req.user = await User.findById(decoded.id).select("-password");

      // Chama a próxima função de middleware ou rota.
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Não autorizado");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Não autorizado. Está sem token");
  }
});

module.exports = { protect };
