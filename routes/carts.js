const express = require("express");
const router = express.Router();

router.use(express.json());

// 장바구니 담기
router.post("/", (req, res) => {
    res.json("장바구니 담기");
});

// 장바구니 조회
router.get("/", (req, res) => {
    res.json("장바구니 조회");
});
// 장바구니 수량 수정
router.put("/", (req, res) => {
    res.json("개별 도서");
});
// 장바구니 제거
router.delete("/:cartId", (req, res) => {
    res.json("개별 도서");
});

// 장바구니에서 선택한 주문 예상 상품 목록 조회
// router.get("/", (req, res) => {
//     res.json("장바구니 조회");
// });

module.exports = router;
