const express = require("express");
const router = express.Router();

router.use(express.json());

// 전체도서
router.get("/", (req, res) => {
    res.json("도서 목록 가져오기");
});

// 개별도서
router.get("/:bookid", (req, res) => {
    res.json("개별 도서");
});

// 카테고리별 도서 api
router.get("/", (req, res) => {
    req.query.categoryid;
    res.json("카테고리별 도서 api");
});

module.exports = router;
