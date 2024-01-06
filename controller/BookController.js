const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

let bookCon = {
    allBooks: (req, res) => {
        let { category_id, newBook, limit, currentPage } = req.query;

        // limit : page 당 도서 수 ex.3
        // currentPage : 현재 몇 페이지 ex. 1,2,3...
        // offset :                     ex.0, 3, 6, 9
        let offset = limit * (currentPage - 1);
        let sql = "SELECT *, (select count(*) from likes where liked_book_id = books.id) AS likes FROM books WHERE 1=1";
        let values = [];
        if (category_id) {
            sql += " AND category_id = ?";
            values.push(category_id);
        }
        if (newBook) {
            sql += " AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) and NOW()";
        }
        values.push(parseInt(limit), offset);
        sql += " LIMIT ? OFFSET ? ";

        conn.query(sql, values, (err, results) => {
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
        const { user_id } = req.body;
        const values = [user_id, bookId];
        let sql =
            "select *, (select count(*) from likes where liked_book_id = books.id) AS likes, (select exists (select * from likes where user_id = ? and liked_book_id = books.id)) AS liked from books left join category on books.category_id = category.id where books.id = ?";
        conn.query(sql, values, function (err, results) {
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
