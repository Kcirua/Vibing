const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");

router.post("/insights", aiController.getInsights);

module.exports = router;
