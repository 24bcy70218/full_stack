const router = require("express").Router();
const Post = require("../models/Post");

router.get("/", async (req,res)=>{
  res.json(await Post.find());
});

router.post("/", async (req,res)=>{
  const p = await Post.create({text:req.body.text,likes:0});
  res.json(p);
});

router.put("/like/:id", async (req,res)=>{
  const p = await Post.findById(req.params.id);
  p.likes++;
  await p.save();
  res.json(p);
});

router.delete("/:id", async (req,res)=>{
  await Post.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;
