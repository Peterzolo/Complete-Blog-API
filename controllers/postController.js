const Post = require("../models/PostModel");

exports.getAllPosts = async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);    
  } catch (err) {
    res.status(500).json(err);
  }
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
        await post.delete();
        res.status(201).send("Post has been successffully deleted");
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      res.status(400).send("You can only delete your own posts");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSinglePost = async(req, res) =>{
   try {
     const post = await Post.findById(req.params.id)
     res.status(200).send(post)
   } catch (error) {
     res.status(500).send(error)
   }
}
