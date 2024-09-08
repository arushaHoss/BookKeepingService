const db = require('../../model');
const Books = db.books
const Users = db.users
const Libraries = db.libraries


const createBooks = async (req, res) => {
    try {

        let { title, authorId, publishedDate, genre, libraryId, borrowerId, charge } = req.body;
        
        let bookCreate_data = {
            title: title,
            authorId: authorId,
            publishedDate: publishedDate,
            genre: genre,
            libraryId: libraryId,
            borrowerId: borrowerId,
            charge: charge
        }

        await Books.create(bookCreate_data);

        res.status(200).send({
            success: true,
            message: "Book added successfully",
            data: bookCreate_data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error.message,
            data: []
        })
    }
}

const getAllBooks = async (req, res) => {
    try {

        const { page = 1, pageSize = 10 } = req.query; // Default to page 1 and pageSize 10 if not provided
        const limit = parseInt(pageSize, 10); // Number of records per page
        const offset = (parseInt(page, 10) - 1) * limit; // Offset for pagination

        const books = await Books.findAll({
            include: [
                {
                    model: Users,
                    as: 'Author', // Alias for the author relationship
                },
                {
                    model: Users,
                    as: 'Borrower', // Alias for the borrower relationship
                },
                {
                    model: Libraries,
                    as: 'Library', // Alias for the library relationship
                }
            ],
            limit,   // Limit number of records per page
            offset,  // Offset for pagination
        });

        // Count total number of records to compute total pages
        const totalCount = await Books.count();

        res.status(200).send({
            success: true,
            data: books,
            pagination: {
                currentPage: parseInt(page, 10),
                pageSize: limit,
                totalItems: totalCount,
                totalPages: Math.ceil(totalCount / limit),
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error.message,
            data: [],
        });
    }
};


const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Books.findOne({
            where: { id },
            include: ['Library', 'Author', 'Borrower']
        });

        if (!book) {
            return res.status(404).send({
                success: false,
                message: 'Book not found',
                data: []
            });
        }

        res.status(200).send({
            success: true,
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

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        let { title, authorName, publishedDate, genre, libraryId, borrowerId, authorId, charge } = req.body;

        const [updated] = await Books.update({
            title: title,
            authorName: authorName,
            publishedDate: publishedDate,
            genre: genre,
            libraryId: libraryId,
            borrowerId: borrowerId,
            authorId: authorId,
            charge: charge
        }, {
            where: { id }
        });

        if (updated) {
            const updatedBook = await Books.findOne({ where: { id } });
            return res.status(200).send({
                success: true,
                data: updatedBook
            });
        }

        res.status(404).send({
            success: false,
            message: 'Book not found',
            data: []
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

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Books.destroy({
            where: { id }
        });

        if (deleted) {
            return res.status(200).send({
                success: true,
                message: 'Book deleted successfully'
            });
        }

        res.status(404).send({
            success: false,
            message: 'Book not found',
            data: []
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
    createBooks,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};