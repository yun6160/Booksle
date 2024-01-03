const express = require("express");
const router = express.Router();
router.use(express.json());

// 결제하기 주문 등록
router.post("/", (req, res) => {
    res.json("주문 등록");
});

// 주문 목록 조회
router.get("/:userid", (req, res) => {
    res.json("주문 목록 조회");
});

// 특정 주문 상세 조회
router.get("/:orderId", (req, res) => {
    res.json("특정 주문 상세 조회");
});
module.exports = router;
