const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  try {
    const { amount, category, type, date } = req.body;

    if (!amount || !category || !type || !date) {
      return res.status(400).json({ message: "Amount, category, type and date are required" });
    }

    if (!["essential", "non-essential"].includes(type)) {
      return res.status(400).json({ message: "Type must be essential or non-essential" });
    }

    const expense = await Expense.create({
      user: req.userId,
      amount,
      category,
      type,
      date,
    });

    res.status(201).json({ expense });
  } catch (err) {
    res.status(500).json({ message: "Could not add expense" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({ date: -1 });
    res.json({ expenses });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch expenses" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.deleteOne({ _id: req.params.id, user: req.userId });
    res.json({ message: "Expense entry removed" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete expense entry" });
  }
};
