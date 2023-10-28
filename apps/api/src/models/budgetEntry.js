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
  { timestamps: true, versionKey: false }
);

budgetEntrySchema.pre('find', function (next) {
  this.sort({ createdAt: -1 });
  this.select('-userId -createdAt -updatedAt');
  next();
});

budgetEntrySchema.plugin(mongoosePaginate);

const BudgetEntry = mongoose.model('BudgetEntry', budgetEntrySchema);

module.exports = BudgetEntry;
