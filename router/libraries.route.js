var express = require("express");
var router = express.Router();

const { 
    validateApiData,
    verifyToken,
    verifyAdminToken
} = require("../middleware/token.middleware");

const {
    getAllLibraries,
    getLibraryById,
    createLibrary,
    updateLibraryById,
    deleteLibraryById,
    getLibraryInventory,
    addBookToInventory,
    removeBookFromInventory
} = require("../controllers/api/librariesController");

const { 
    getAllLibrariesValidate,
    getLibraryByIdValidate,
    createLibrariesValidate,
    updateLibrariesValidate,
    deleteLibraryByIdValidate,
    getLibraryInventoryValidate,
    addBookToInventoryValidate,
    removeBookFromInventoryValidate
} = require("../middleware/libraries.validator");

router.get('/', verifyToken, getAllLibrariesValidate, validateApiData, getAllLibraries);
router.get('/:id', verifyToken, getLibraryByIdValidate, validateApiData,  getLibraryById);
router.post('/', verifyToken, createLibrariesValidate, validateApiData, createLibrary);
router.put('/:id', verifyToken, updateLibrariesValidate, validateApiData, updateLibraryById);
router.delete('/:id', verifyToken, deleteLibraryByIdValidate, validateApiData, deleteLibraryById);
router.get('/:id/inventory', verifyToken, getLibraryInventoryValidate, validateApiData, getLibraryInventory);
router.post('/:id/inventory', verifyAdminToken, addBookToInventoryValidate, validateApiData, addBookToInventory);
router.delete('/:id/inventory/:bookId', verifyAdminToken, removeBookFromInventoryValidate, validateApiData, removeBookFromInventory);



// router.get('/', verifyToken, getAllBooksValidate, validateApiData, getAllBooks);
// router.get('/:id', verifyToken, getBookByIdValidate, validateApiData,  getBookById);
// router.put('/:id', verifyToken, updateBooksValidate, validateApiData, updateBook);
// router.delete('/:id', verifyToken, deleteBookByIdValidate, validateApiData, deleteBook);

module.exports = router;
