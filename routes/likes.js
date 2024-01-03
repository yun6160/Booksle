const express = require("express");
const router = express.Router();

router.use(express.json());

// 좋아요 추가
router.post("/:bookid", (req, res) => {
    res.json("좋아요 추가");
});

// 좋아요 취소
router.delete("/:bookid", (req, res) => {
    res.json("좋아요 취소");
});

module.exports = router;
