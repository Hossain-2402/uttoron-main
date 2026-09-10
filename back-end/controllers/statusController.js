const Income = require("../models/Income");
const Expense = require("../models/Expense");
const User = require("../models/User");

const SURVIVAL_WINDOW_DAYS = 30;

exports.getStatus = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    const incomes = await Income.find({ user: req.userId });
    const expenses = await Expense.find({ user: req.userId });

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalAid = incomes.filter((i) => i.isAid).reduce((sum, i) => sum + i.amount, 0);

    const essentialExpenses = expenses.filter((e) => e.type === "essential");
    const nonEssentialExpenses = expenses.filter((e) => e.type === "non-essential");

    const totalEssential = essentialExpenses.reduce((sum, e) => sum + e.amount, 0);
    const totalNonEssential = nonEssentialExpenses.reduce((sum, e) => sum + e.amount, 0);
    const totalExpenses = totalEssential + totalNonEssential;

    const remainingResources = totalIncome - totalExpenses;

    const windowStart = new Date();
    windowStart.setDate(windowStart.getDate() - SURVIVAL_WINDOW_DAYS);

    const recentEssential = essentialExpenses.filter((e) => new Date(e.date) >= windowStart);
    const recentEssentialTotal = recentEssential.reduce((sum, e) => sum + e.amount, 0);
    const avgDailyEssential = recentEssentialTotal / SURVIVAL_WINDOW_DAYS;

    const minSurvivalBudgetMonthly = avgDailyEssential * 30;
    const daysFundsWillLast =
      avgDailyEssential > 0 ? Math.floor(remainingResources / avgDailyEssential) : null;

    const baseline = user.baselineIncome || 0;
    const recoveryPercent = baseline > 0 ? Math.min(100, Math.round((remainingResources / baseline) * 100)) : 0;

    res.json({
      baselineIncome: baseline,
      recoveryPercent,
      totalIncome,
      totalAid,
      totalEssential,
      totalNonEssential,
      totalExpenses,
      remainingResources,
      avgDailyEssential: Math.round(avgDailyEssential),
      minSurvivalBudgetMonthly: Math.round(minSurvivalBudgetMonthly),
      daysFundsWillLast,
    });
  } catch (err) {
    res.status(500).json({ message: "Could not calculate status" });
  }
};
