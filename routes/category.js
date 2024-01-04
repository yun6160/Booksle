const express = require("express");
const router = express.Router();
const con = require("../controller/CategoryController");

router.use(express.json());

router.get("/", con.allCategory);

module.exports = router;
