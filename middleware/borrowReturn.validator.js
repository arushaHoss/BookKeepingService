const { body, param } = require('express-validator');

// Validation for borrowing a book
const borrowBookValidate = [
    body('bookId')
        .isInt({ min: 1 }).withMessage('Book ID must be a positive integer.'),
    body('userId')
        .isInt({ min: 1 }).withMessage('User ID must be a positive integer.'),
    body('charge')
        .isFloat({ min: 0 }).withMessage('Charge must be a positive number.')
];

// Validation for returning a borrowed book
const returnBookValidate = [
    param('id')
        .isInt({ min: 1 }).withMessage('Book ID must be a positive integer.')
];

module.exports = {
    borrowBookValidate,
    returnBookValidate
};
