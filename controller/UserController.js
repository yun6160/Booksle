const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); //암호화 담당 내장 모듈
const dotenv = require("dotenv").config();

let userCon = {
    join: (req, res) => {
        const { email, password } = req.body;

        const salt = crypto.randomBytes(10).toString("base64");
        const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, "sha512").toString("base64");

        let sql = "INSERT INTO users (email, password, salt) VALUES (?,?,?)";
        let values = [email, hashPassword, salt];
        conn.query(sql, values, function (err, results) {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            res.status(StatusCodes.CREATED).json({
                message: `${email}님, 가입 축하드립니다!`,
            });
        });
    },
    login: (req, res) => {
        const { email, password } = req.body;
        let sql = "SELECT * FROM users WHERE email = ?";
        conn.query(sql, email, function (err, results) {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            let loginUser = results[0];

            const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, "sha512").toString("base64");

            if (loginUser && loginUser.password == hashPassword) {
                // token 발행
                const token = jwt.sign(
                    {
                        email: loginUser.email,
                        id: loginUser.id,
                    },
                    process.env.PRIVATE_KEY,
                    {
                        expiresIn: "30m",
                        issuer: "yun",
                    }
                );
                res.cookie("token", token, { httpOnly: true });
                res.status(StatusCodes.OK).json({
                    message: `${loginUser.email}님, 안녕하세요!`,
                });
            } else {
                res.status(StatusCodes.FORBIDDEN).json({
                    message: "이메일 또는 비밀번호가 틀렸습니다",
                });
            }
        });
    },
    resetPasswordRequest: (req, res) => {
        const { email } = req.body;
        let sql = "SELECT * FROM users WHERE email = ?";
        conn.query(sql, email, function (err, results) {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            const loginUser = results[0];
            if (loginUser) {
                return res.status(StatusCodes.OK).json({
                    email: email,
                });
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).end();
            }
        });
    },
    resetPassword: (req, res) => {
        const { email, password } = req.body;

        const salt = crypto.randomBytes(10).toString("base64");
        const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, "sha512").toString("base64");

        let sql = "UPDATE users SET password = ?, salt = ? WHERE email = ?";
        let values = [hashPassword, salt, email];
        conn.query(sql, values, function (err, results) {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if (results.affectedRows == 0) {
                return res.status(StatusCodes.BAD_REQUEST).end();
            } else {
                res.status(StatusCodes.OK).json({
                    message: `${email}님, 비밀번호가 변경되었습니다`,
                });
            }
        });
    },
};

module.exports = userCon;
