const express = require("express");
const router = express.Router();
const Article = require("./../models/articles");

router.get("/", (req, res) => {
  res.send("We are in articles currently");
});
router.get("/new", async (req, res) => {
  let article = await Article.find();
  res.render("articles/new.ejs", { article: article });
});
router.get("/:slug", async (req, res) => {
  let article = await Article.findOne({ slug: req.params.slug });
  if (article == null) return res.redirect("/");
  res.render("articles/newArticle.ejs", { article: article });
});

router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (e) {
    res.render("articles/new.ejs", { article: article });
  }
});
router.get("/edit/:id", async (req, res) => {
  try {
    let article = await Article.findById(req.params.id);
    res.render("articles/edit.ejs", { article: article });
  } catch (e) {
    console.log(e);
  }
});
router.put("/:id", async (req, res) => {
  try {
    let article = await Article.findById(req.params.id);
    console.log(article);
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    console.log(article.title);

    await article.save();
    res.redirect("/");
  } catch (e) {
    console.log("error");
  }
});
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
});

module.exports = router;
