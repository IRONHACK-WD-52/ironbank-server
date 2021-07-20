const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  profilePictureUrl: { type: String, trim: true },
  address: new Schema({
    street: String,
    neighbourhood: String,
    city: String,
    state: String,
    postalCode: String,
    number: String,
  }),
  profession: { type: String, trim: true, required: true },
  maritalStatus: {
    type: String,
    required: true,
    enum: ["Casado(a)", "Divorciado(a)", "Solteiro(a)", "Viuvo(a)"],
  },
  birthDate: { type: Date, required: true },
  phoneNumber: { type: String, trim: true },
  document: { type: String, required: true, trim: true },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
