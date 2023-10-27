const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const budgetEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

budgetEntrySchema.plugin(mongoosePaginate);

const BudgetEntry = mongoose.model('BudgetEntry', budgetEntrySchema);

module.exports = BudgetEntry;
