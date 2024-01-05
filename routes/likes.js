const express = require("express");
const router = express.Router();

const con = require("../controller/LikeController");

router.use(express.json());

// 좋아요 추가
router.post("/:bookid", con.addLikes);

// 좋아요 취소
router.delete("/:bookid", con.removeLikes);

module.exports = router;
