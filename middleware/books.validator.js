const { param, query, body } = require('express-validator');

const createBooksValidate = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required.'),
    
    body('authorId')
    .notEmpty().withMessage('Author ID is required.')
    .isInt().withMessage('Author ID must be an integer.'),
    
    body('publishedDate')
        .notEmpty().withMessage('Published date is required.')
        .custom(value => /^([0-2][0-9]|(3)[0-1])-(0[1-9]|1[0-2])-\d{4}$/.test(value))
        .withMessage('Published date must be in dd-mm-yyyy format.'),
    
    body('genre')
        .trim()
        .notEmpty().withMessage('Genre is required.'),

    body('libraryId')
        .notEmpty().withMessage('Library ID is required.')
        .isInt().withMessage('Library ID must be an integer.'),
    
    body('borrowerId')
        .optional()
        .isInt().withMessage('Borrower ID must be an integer.'),

    body('charge')
    .optional()
    .isInt().withMessage('Charge must be an integer')
];

const getAllBooksValidate = [
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page number must be a positive integer.'),
    
    query('pageSize')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('Page size must be an integer between 1 and 100.'),
];

const getBookByIdValidate = [
    param('id')
        .isInt({ min: 1 }).withMessage('Book ID must be a positive integer.'),
];

const updateBooksValidate = [
    param('id')
        .isInt({ min: 1 }).withMessage('Book ID must be a positive integer.'),
    
    // Validate title if provided, but it's optional
    body('title')
        .optional()
        .isString().withMessage('Title must be a string.'),
    
    // Validate authorId if provided, but it's optional
    body('authorId')
        .optional()
        .isInt().withMessage('Author ID must be an integer.'),
    
    // Validate publishedDate if provided, but it's optional
    body('publishedDate')
        .optional()
        .custom(value => /^([0-2][0-9]|(3)[0-1])-(0[1-9]|1[0-2])-\d{4}$/.test(value))
        .withMessage('Published date must be in dd-mm-yyyy format.'),
    
    // Validate genre if provided, but it's optional
    body('genre')
        .optional()
        .isString().withMessage('Genre must be a string.'),
    
    // Validate libraryId if provided, but it's optional
    body('libraryId')
        .optional()
        .isInt().withMessage('Library ID must be an integer.'),
    
    // Validate borrowerId if provided, but it's optional
    body('borrowerId')
        .optional()
        .isInt().withMessage('Borrower ID must be an integer.'),
    
    body('charge')
        .optional()
        .isInt().withMessage('Charge must be an integer')
];

const deleteBookByIdValidate = [
    param('id')
        .isInt({ min: 1 }).withMessage('Book ID must be a positive integer.'),
];

const borrowBookValidate = [
    body('bookId')
        .isInt({ min: 1 }).withMessage('Book ID must be a positive integer.'),
    body('charge')
        .isFloat({ min: 0 }).withMessage('Charge must be a positive number.')
];

// Validation for returning a borrowed book
const returnBookValidate = [
    param('id')
        .isInt({ min: 1 }).withMessage('Book ID must be a positive integer.')
];

module.exports = {
    createBooksValidate,
    getAllBooksValidate,
    getBookByIdValidate,
    updateBooksValidate,
    deleteBookByIdValidate,
    borrowBookValidate
}