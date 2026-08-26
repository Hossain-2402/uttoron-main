const User = require("../models/User");

exports.setBaseline = async (req, res) => {
  try {
    const { baselineIncome } = req.body;

    if (baselineIncome === undefined || baselineIncome < 0) {
      return res.status(400).json({ message: "A valid baseline income is required" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { baselineIncome },
      { new: true }
    ).select("-password");

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Could not update baseline" });
  }
};
