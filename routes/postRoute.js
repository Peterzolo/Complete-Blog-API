const express = require("express");
const router = express.Router();


const { getAllPosts, createPost, updatePost } = require("../controllers/postController");

router.get('/', getAllPosts)
router.post('/', createPost)
router.put('/:id', updatePost)



module.exports = router;
