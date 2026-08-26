const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    source: { type: String, required: true, trim: true },
    isAid: { type: Boolean, default: false },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", incomeSchema);
