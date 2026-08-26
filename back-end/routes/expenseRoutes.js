const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const { addExpense, getExpenses, deleteExpense } = require("../controllers/expenseController");

router.use(requireAuth);
router.post("/", addExpense);
router.get("/", getExpenses);
router.delete("/:id", deleteExpense);

module.exports = router;
