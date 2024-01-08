const express = require("express");
const router = express.Router();
const con = require("../controller/CartController");
router.use(express.json());

// 장바구니 담기
router.post("/", con.addToCart);
// 장바구니 조회 / 선택된 장바구니 아이템 목록 조회
router.get("/", con.getCartItem);
// 장바구니 수량 수정
router.put("/", con.updateCartItem);
// 장바구니 제거
router.delete("/:id", con.removeCartItem);

module.exports = router;
