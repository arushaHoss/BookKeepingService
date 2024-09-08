const express = require('express');
const router = express.Router();
const { 
    validateApiData,
    verifyToken
} = require("../middleware/token.middleware");

const { 
    borrowBookValidate, 
    returnBookValidate 
} = require('../middleware/borrowReturn.validator');

const { 
    borrowBook, 
    returnBook } = require('../controllers/api/borrowReturnController');

router.post('/borrow', verifyToken, borrowBookValidate, validateApiData, borrowBook);
router.put('/return/:id', verifyToken, returnBookValidate, validateApiData, returnBook);

module.exports = router;
