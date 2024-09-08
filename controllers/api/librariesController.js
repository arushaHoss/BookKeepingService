const db = require('../../model'); // Adjust the path as needed
const Books = db.books
const Users = db.users
const Libraries = db.libraries

// Function to retrieve a list of all libraries
const getAllLibraries = async (req, res) => {
    try {

        const { page = 1, pageSize = 10 } = req.query; // Default to page 1 and pageSize 10 if not provided
        const limit = parseInt(pageSize, 10); // Number of records per page
        const offset = (parseInt(page, 10) - 1) * limit; // Offset for pagination

        const libraries = await Libraries.findAll({
            include: [
                {
                    model: Books,
                    as: 'Books', // Alias for the borrower relationship
                    include: {
                        model: Users,
                        as: 'Borrower',
                        attributes: ['id', 'firstName', 'lastName']
                    }
                },
            ],
            limit,   // Limit number of records per page
            offset,  // Offset for pagination
        });

        res.status(200).send({
            success: true,
            data: libraries
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

// Function to retrieve details of a specific library by its ID
const getLibraryById = async (req, res) => {
    try {
        const { id } = req.params;

        const library = await Libraries.findOne({
            where: { id },
            include: {
                model: Books,
                as: 'Books',
                include: {
                    model: Users,
                    as: 'Borrower',
                    attributes: ['id', 'firstName', 'lastName']
                }
            }
        });

        if (!library) {
            return res.status(404).send({
                success: false,
                message: 'Library not found',
                data: []
            });
        }

        res.status(200).send({
            success: true,
            data: library
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

// Function to create a new library
const createLibrary = async (req, res) => {
    try {
        const { name, location } = req.body;

        const newLibrary = await Libraries.create({ name, location });

        res.status(201).send({
            success: true,
            message: 'Library created successfully',
            data: newLibrary
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

// Function to update details of a specific library by its ID
const updateLibraryById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location } = req.body;

        const [updated] = await Libraries.update({ name, location }, {
            where: { id }
        });

        if (updated) {
            const updatedLibrary = await Libraries.findOne({ where: { id } });
            res.status(200).send({
                success: true,
                message: 'Library Updated Successfully',
                data: updatedLibrary
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'Library not found',
                data: []
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error.message,
            data: []
        });
    }
};

// Function to delete a library by its ID
const deleteLibraryById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the library exists
        const library = await Libraries.findOne({ where: { id } });
        if (!library) {
            return res.status(404).send({
                success: false,
                message: 'Library not found',
                data: []
            });
        }

        //Soft Delete
        await Libraries.update({ deletedAt: new Date() }, { where: { id } });

        res.status(200).send({
            success: true,
            message: 'Library deleted successfully'
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

const getLibraryInventory = async (req, res) => {
    try {
        const { page = 1, pageSize = 10 } = req.query; // Default to page 1 and pageSize 10 if not provided
        const limit = parseInt(pageSize, 10); // Number of records per page
        const offset = (parseInt(page, 10) - 1) * limit; // Offset for pagination

        const { id } = req.params;

        // Find the library
        const library = await Libraries.findOne({
            where: { id, deletedAt: null }
        });

        if (!library) {
            return res.status(404).send({
                success: false,
                message: 'Library not found',
                data: []
            });
        }

        // Find the books associated with the library
        const books = await Books.findAndCountAll({
            where: { libraryId: id },
            limit,   // Limit number of records per page
            offset,  // Offset for pagination
            // include: {
            //     model: Users,
            //     as: 'Borrower',  // Assuming 'Borrower' is the alias for the borrower association
            //     // attributes: ['id', 'name'] // Adjust fields as needed
            // }
        });

        res.status(200).send({
            success: true,
            data: {
                books: books.rows,
                totalCount: books.count,
                totalPages: Math.ceil(books.count / limit),
                currentPage: parseInt(page, 10),
                pageSize: limit
            }
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

// Function to add a book to the inventory of a specific library
const addBookToInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const { bookId } = req.body;

        const library = await Libraries.findOne({
            where: { id, deletedAt: null }
        });

        if (!library) {
            return res.status(404).send({
                success: false,
                message: 'Library not found',
                data: []
            });
        }

        const book = await Books.findOne({where: {id: bookId}});
        if (!book) {
            return res.status(404).send({
                success: false,
                message: 'Book not found',
                data: []
            });
        }

        // Add book to library inventory
        await book.update({ libraryId: id });

        res.status(200).send({
            success: true,
            message: 'Book added to inventory successfully',
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

// Function to remove a book from the inventory of a specific library by its ID
const removeBookFromInventory = async (req, res) => {
    try {
        const { id, bookId } = req.params;

        const library = await Libraries.findByPk(id);
        if (!library) {
            return res.status(404).send({
                success: false,
                message: 'Library not found',
                data: []
            });
        }

        const book = await Books.findOne({ where: { id: bookId, libraryId: id } });
        if (!book) {
            return res.status(404).send({
                success: false,
                message: 'Book not found in this library',
                data: []
            });
        }

        // Remove book from library inventory
        await book.update({ libraryId: null });

        res.status(200).send({
            success: true,
            message: 'Book removed from inventory successfully'
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
    getAllLibraries,
    getLibraryById,
    createLibrary,
    updateLibraryById,
    deleteLibraryById,
    getLibraryInventory,
    addBookToInventory,
    removeBookFromInventory
};
