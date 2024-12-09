import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }], // массив ObjectId
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
