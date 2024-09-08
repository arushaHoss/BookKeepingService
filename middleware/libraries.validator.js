const { param, query, body } = require('express-validator');

const getAllLibrariesValidate = [
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page number must be a positive integer.'),
    
    query('pageSize')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('Page size must be an integer between 1 and 100.'),
];

const getLibraryByIdValidate = [
    param('id')
        .isInt({ min: 1 }).withMessage('Library ID must be a positive integer.'),
];

const createLibrariesValidate = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required.'),

    body('location')
    .trim()
    .notEmpty().withMessage('Location is required.'),
    
];

const updateLibrariesValidate = [
    param('id')
        .isInt({ min: 1 }).withMessage('Library ID must be a positive integer.'),
    
    body('name')
        .optional()
        .isString().withMessage('Name must be a string.'),
    
    body('location')
        .optional()
        .isString().withMessage('Location must be a string.'),
];

const deleteLibraryByIdValidate = [
    param('id')
        .isInt({ min: 1 }).withMessage('Book ID must be a positive integer.'),
];

const getLibraryInventoryValidate = [
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page number must be a positive integer.'),
    
    query('pageSize')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('Page size must be an integer between 1 and 100.'),
        
    param('id')
        .isInt({ min: 1 }).withMessage('Library ID must be a positive integer.')
];

// Validation for adding a book to the library inventory
const addBookToInventoryValidate = [
    param('id')
        .isInt({ min: 1 }).withMessage('Library ID must be a positive integer.'),
    body('bookId')
        .isInt({ min: 1 }).withMessage('Book ID must be a positive integer.')
];

// Validation for removing a book from the library inventory
const removeBookFromInventoryValidate = [
    param('id')
        .isInt({ min: 1 }).withMessage('Library ID must be a positive integer.'),
    param('bookId')
        .isInt({ min: 1 }).withMessage('Book ID must be a positive integer.')
];


module.exports = {
    getAllLibrariesValidate,
    getLibraryByIdValidate,
    createLibrariesValidate,
    updateLibrariesValidate,
    deleteLibraryByIdValidate,
    getLibraryInventoryValidate,
    addBookToInventoryValidate,
    removeBookFromInventoryValidate
}