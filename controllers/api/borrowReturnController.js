const db = require('../../model');
const Books = db.books
const Users = db.users
const Libraries = db.libraries

const borrowBook = async (req, res) => {
    try {
        const { bookId, charge, userId } = req.body;

        const book = await Books.findOne({where: {id: bookId}});
        if (!book) {
            return res.status(404).send({
                success: false,
                message: 'Book not found',
                data: []
            });
        }

        if (book.borrowerId) {
            return res.status(400).send({
                success: false,
                message: 'Book is already borrowed',
                data: []
            });
        }

        // Update the book record to set the borrower
        await book.update({
            borrowerId: userId,
            charge: charge // Assuming `charge` is a field in the `Books` model
        });

        res.status(200).send({
            success: true,
            message: 'Book borrowed successfully',
            data: book
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error.message,
            data: []
        });
    }
};

// Function to return a borrowed book by its ID
const returnBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Books.findOne({where: {id: id}});
        if (!book) {
            return res.status(404).send({
                success: false,
                message: 'Book not found',
                data: []
            });
        }

        if (!book.borrowerId) {
            return res.status(400).send({
                success: false,
                message: 'Book is not currently borrowed',
                data: []
            });
        }

        // Update the book record to remove the borrower
        await book.update({
            borrowerId: null,
        });

        res.status(200).send({
            success: true,
            message: 'Book returned successfully',
            data: book
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error.message,
            data: []
        });
    }
};

module.exports = {
    borrowBook,
    returnBook
};
