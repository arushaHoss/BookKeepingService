var express = require("express");
var router = express.Router();

const usersRoutes = require("./user.route");
const booksRoutes = require("./books.route");
const librariesRoutes = require("./libraries.route");
const borrowReturnRoutes = require("./borrowReturn.route");


router.use('/users', usersRoutes);
router.use('/books', booksRoutes);
router.use('/libraries', librariesRoutes);
router.use('/', borrowReturnRoutes)

module.exports = router;
