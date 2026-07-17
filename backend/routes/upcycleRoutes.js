const express = require("express");
const router = express.Router();
const upcycleController = require("../controllers/upcycleController");

router.post("/", upcycleController.moveToUpcycle);
router.get("/", upcycleController.getUpcycleHistory);

module.exports = router;
