const express = require("express");
const app = express();

const dotenv = require("dotenv").config();

app.listen(process.env.PORT);

const userRouter = require("./routes/users");
const orderRouter = require("./routes/orders");
const bookRouter = require("./routes/books");
const likeRouter = require("./routes/likes");
const cartRouter = require("./routes/carts");
const categoryRouter = require("./routes/category");

app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/books", bookRouter);
app.use("/likes", likeRouter);
app.use("/carts", cartRouter);
app.use("/category", categoryRouter);
