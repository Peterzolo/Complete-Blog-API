const Post = require("../models/PostModel");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts.length < 1) return res.status(401).send("No Post Found");
    res.status().send(posts);
  } catch (error) {}
};

exports.createPost = async (req, res) => {
  const newPost = await new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).send({ Success: savedPost });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(201).send(updatedPost);
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      res.status(400).send("You can only update your own posts");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


exports.deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
          );
          res.status(201).send(updatedPost);
        } catch (error) {
          res.status(500).send(error);
        }
      } else {
        res.status(400).send("You can only update your own posts");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };