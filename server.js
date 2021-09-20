const express = require("express");
const app = express();
const articlesRoute = require("./Routes/articles");
const mongoose = require("mongoose");
const Article = require("./models/articles");
const methodOverride = require("method-override");
mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use(methodOverride("_method"));
app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/articles", articlesRoute);
app.get("/", async (req, res) => {
  let articles = await Article.find().sort({ createdAt: "desc" });
  if (articles == null) return res.redirect("/");
  res.render("articles/index.ejs", { articles: articles });
});

app.listen(3000);
