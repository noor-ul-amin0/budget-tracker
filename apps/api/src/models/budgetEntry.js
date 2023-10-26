const mongoose = require("mongoose");

const budgetEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BudgetEntry = mongoose.model("BudgetEntry", budgetEntrySchema);

module.exports = BudgetEntry;
