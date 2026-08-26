const Income = require("../models/Income");

exports.addIncome = async (req, res) => {
  try {
    const { amount, source, isAid, date } = req.body;

    if (!amount || !source || !date) {
      return res.status(400).json({ message: "Amount, source and date are required" });
    }

    const income = await Income.create({
      user: req.userId,
      amount,
      source,
      isAid: !!isAid,
      date,
    });

    res.status(201).json({ income });
  } catch (err) {
    res.status(500).json({ message: "Could not add income" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.userId }).sort({ date: -1 });
    res.json({ incomes });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch income" });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    await Income.deleteOne({ _id: req.params.id, user: req.userId });
    res.json({ message: "Income entry removed" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete income entry" });
  }
};
