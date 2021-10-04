
const express = require('express');
const { createCategory, getAllGategories } = require('../controllers/categoriesController');

const router = express.Router();

router.post('/', createCategory)
router.get('/', getAllGategories)




module.exports = router;