const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const { getStatus } = require("../controllers/statusController");
const { setBaseline } = require("../controllers/baselineController");

router.use(requireAuth);
router.get("/", getStatus);
router.put("/baseline", setBaseline);

module.exports = router;
