const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
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
    password: {
      type: String,
      required: [true, "Por favor adicione uma senha"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
