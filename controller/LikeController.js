const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); //암호화 담당 내장 모듈
const dotenv = require("dotenv").config();

let likeCon = {
    addLikes: (req, res) => {
        const { bookid } = req.params;
        const { user_id } = req.body;
        let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?,?)";
        let values = [user_id, bookid];
        conn.query(sql, values, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            res.status(StatusCodes.CREATED).json("좋아요 추가");
        });
    },
    removeLikes: (req, res) => {
        const { bookid } = req.params;
        const { user_id } = req.body;
        let sql = "DELETE FROM likes where liked_book_id = ? and user_id = ?";
        let values = [bookid, user_id];
        conn.query(sql, values, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            res.status(StatusCodes.OK).json("좋아요 삭제");
        });
    },
};

module.exports = likeCon;
