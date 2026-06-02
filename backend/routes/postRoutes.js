const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

router.post("/create", async (req, res) => {
  try {
    const { userId, username, text, image } = req.body;

    const newPost = new Post({
      userId,
      username,
      text,
      image,
    });

    await newPost.save();

    res.status(201).json({
      message: "Post Created Successfully",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/feed", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/like/:id", async (req, res) => {
  try {
    const { username } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(username)) {
      post.likes.push(username);
      await post.save();
    }

    res.status(200).json({
      message: "Post Liked",
      likes: post.likes,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/comment/:id", async (req, res) => {
  try {
    const { username, comment } = req.body;

    const post = await Post.findById(req.params.id);

    post.comments.push({
      username,
      comment,
    });

    await post.save();

    res.status(200).json({
      message: "Comment Added",
      comments: post.comments,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;