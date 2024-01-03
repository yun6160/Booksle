const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const dotenv = require("dotenv").config();

let bookCon = {
    allBooks: (req, res) => {
        let { category_id } = req.query;
        let sql = "";
        let value = "";
        if (category_id) {
            sql = "SELECT * FROM books WHERE category_id = ?";
            value = category_id;
        } else {
            sql = "SELECT * FROM books";
        }
        conn.query(sql, value, (err, results) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if (results.length) {
                res.status(StatusCodes.OK).json(results);
            } else {
                res.status(StatusCodes.FORBIDDEN).json({
                    message: "조회할 도서가 없습니다",
                });
            }
        });
    },
    booksDetail: (req, res) => {
        const { bookId } = req.params;
        let sql = "SELECT * FROM books WHERE id = ?";
        conn.query(sql, bookId, function (err, results) {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            let book = results[0];

            if (book) {
                res.status(StatusCodes.OK).json(book);
            } else {
                res.status(StatusCodes.FORBIDDEN).json({
                    message: "찾는 책의 정보가 없습니다",
                });
            }
        });
    },
};

module.exports = bookCon;
