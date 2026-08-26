const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const { addIncome, getIncomes, deleteIncome } = require("../controllers/incomeController");

router.use(requireAuth);
router.post("/", addIncome);
router.get("/", getIncomes);
router.delete("/:id", deleteIncome);

module.exports = router;
