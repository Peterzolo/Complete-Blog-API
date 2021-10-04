const express = require("express");
const router = express.Router();


const { getAllPosts, createPost, updatePost, deletePost, getSinglePost } = require("../controllers/postController");

router.get('/', getAllPosts)
router.post('/', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.get('/:id', getSinglePost)



module.exports = router;
