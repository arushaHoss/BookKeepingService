var express = require("express");
var router = express.Router();

const { 
    validateApiData,
    verifyToken
} = require("../middleware/token.middleware");

const {
    createBooks, 
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/api/booksController");

const { 
    createBooksValidate,
    getAllBooksValidate,
    getBookByIdValidate,
    updateBooksValidate,
    deleteBookByIdValidate
} = require("../middleware/books.validator");

router.post('/', verifyToken, createBooksValidate, validateApiData, createBooks);
router.get('/', verifyToken, getAllBooksValidate, validateApiData, getAllBooks);
router.get('/:id', verifyToken, getBookByIdValidate, validateApiData,  getBookById);
router.put('/:id', verifyToken, updateBooksValidate, validateApiData, updateBook);
router.delete('/:id', verifyToken, deleteBookByIdValidate, validateApiData, deleteBook);

module.exports = router;
