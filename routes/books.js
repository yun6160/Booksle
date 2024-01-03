const express = require("express");
const router = express.Router();
const bookCon = require("../controller/BookController");

router.use(express.json());

// 전체도서
router.get("/", bookCon.allBooks);

// 개별도서
router.get("/:bookid", bookCon.booksDetail);

// 카테고리별 도서 api
router.get("/", bookCon.booksByCategory);

module.exports = router;
