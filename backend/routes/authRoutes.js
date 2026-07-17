const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login); // INI BARIS YANG BARU DITAMBAHKAN

module.exports = router;