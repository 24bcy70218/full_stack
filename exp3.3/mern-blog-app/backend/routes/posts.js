const router = require("express").Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  res.json(await Post.find());
});

router.post("/", async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
});

router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
