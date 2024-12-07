import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  paragraph: {
    type: [
      {
        description: {
          type: String,
          required: true,
        },
        title: {
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
      message: "123456",
    },
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

const Article = mongoose.model("Article", articleSchema);
export default Article;
