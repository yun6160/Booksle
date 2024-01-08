const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

let cartCon = {
    // 장바구니 추가
    addToCart: (req, res) => {
        const { book_id, qty, user_id } = req.body;
        let sql = "INSERT INTO cartItems (book_id, qty, user_id) VALUES (?,?,?)";
        let values = [book_id, qty, user_id];
        conn.query(sql, values, (err, results) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            res.status(StatusCodes.CREATED).json("장바구니 추가");
        });
    },
    //장바구니 아이템 목록 조회
    getCartItem: (req, res) => {
        const { user_id, selected } = req.body;
        let sql = `select 
                        cartItems.id, book_id, qty, title, summary, price
                    from cartItems
                    left join books on cartItems.book_id = books.id
                    WHERE user_id = ? `;
        if (selected) {
            sql += "AND cartItems.id IN (?)";
        }

        const values = [user_id, selected];
        conn.query(sql, values, (err, results) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            if (results) {
                res.status(StatusCodes.OK).json(results);
            } else {
                res.status(StatusCodes.FORBIDDEN).json({
                    message: "장바구니가 비었습니다",
                });
            }
        });
    },
    //장바구니 아이템 삭제
    removeCartItem: (req, res) => {
        const { id } = req.params;
        const sql = "DELETE FROM cartItems WHERE id = ?";
        conn.query(sql, id, function (err, results) {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            res.status(StatusCodes.OK).json("장바구니의 아이템을 삭제하였습니다");
        });
    },
    updateCartItem: (req, res) => {
        const { id, qty } = req.body;
        const sql = "UPDATE cartItems SET qty = ? WHERE id = ?";
        const values = [qty, id];
        conn.query(sql, values, function (err, results) {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            res.status(StatusCodes.OK).end();
        });
    },
};

module.exports = cartCon;
