const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articlesSchema = new Schema({
  subject: { type: String, required: true },
  title: { type: String, required: true },
  // author: { type: String, required: true },
  link: String,
  date: { type: Date, default: Date.now }
});

const Article = mongoose.model("Article", articlesSchema);
console.log("here in the article.js inside models");

module.exports = Article;
