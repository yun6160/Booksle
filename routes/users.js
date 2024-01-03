const express = require("express");
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const userCon = require("../controller/UserController");
const { body, param, validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const err = validationResult(req);

    if (err.isEmpty()) {
        return next();
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json(err.array());
    }
};
router.use(express.json());

// 회원가입
router.post(
    "/join",
    [
        body("email").notEmpty().isString().isEmail().withMessage("이메일 확인 필요"),
        body("password").notEmpty().isString().withMessage("비밀번호 확인 필요"),
        validate,
    ],
    userCon.join
);

// 로그인
router.post("/login", userCon.login);

// 비밀번호 초기화 요청
router.post("/reset", userCon.resetPasswordRequest);
// 비밀번호 초기화
router.put("/reset", userCon.resetPassword);

module.exports = router;
