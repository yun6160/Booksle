const express = require("express");
const router = express.Router();
const con = require("../controller/BookController");

router.use(express.json());

// 전체도서 or 카테고리 도서
router.get("/", con.allBooks);

// 개별도서
router.get("/:bookId", con.booksDetail);

module.exports = router;
