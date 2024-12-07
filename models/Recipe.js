import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  categories: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "Поле ingredients должно содержать хотя бы один ингредиент",
    },
  },
  image: {
    type: String,
    required: true,
  },
  steps: {
    type: [
      {
        description: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        stepNumber: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
    validate: {
      validator: function (s) {
        return s && s.length > 0;
      },
      message: "ТЕСТ!!!!!",
    },
  },
  cookTime: {
    type: {
      hours: {
        type: Number,
        required: true,
      },
      minutes: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
  author: {
    type: {
      name: {
        type: String,
        required: true,
      },
      surname: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
  },
});

const Recipe = mongoose.model("Recipe", postSchema);
export default Recipe;
