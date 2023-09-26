const mongoose = require("mongoose");

const clientsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor adicione um nome"],
    },
    email: {
      type: String,
      required: [true, "Por favor adicione um email"],
      unique: true,
    },
    contactNumber: {
      type: String,
      required: [true, "Por favor adicione um número de contato"],
    },
    cpf: {
      type: String,
      required: [true, "Por favor adicione um número o CPF"],
    },
    address: {
      type: String,
      required: [true, "Por favor adicione um número o endreço"],
    },
    createdAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", clientsSchema);
