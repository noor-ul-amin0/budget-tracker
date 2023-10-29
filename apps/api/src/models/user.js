const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      trim: true,
      required: [true, 'Please provide your name'],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
      minlength: 5,
      validate(value) {
        let password = value.toLowerCase();
        if (password.includes('password')) {
          throw new Error(`password must not be 'password'`);
        }
      },
      select: false,
    },
    budgetLimit: {
      type: Number,
      required: true,
      min: [0, 'Budget limit must be greater than or equal to 0'],
    },
  },
  { timestamps: true, versionKey: false }
);
//-------------------------------------------------------------------------------------------------------------

userSchema.pre('find', function (next) {
  this.select('-createdAt -updatedAt');
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
//-------------------------------------------------------------------------------------------------------------
userSchema.methods.confirmPassword = async function (
  candidatePassword,
  savePassword
) {
  return await bcrypt.compare(candidatePassword, savePassword);
};
//-------------------------------------------------------------------------------------------------------------
// generating auth token
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    {
      id: this._id + '',
      email: this.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2 days',
    }
  );
  return token;
};

//-------------------------------------------------------------------------------------------------------------
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await UserModel.findOne({
    email,
  }).select('+password -createdAt -updatedAt');
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
  user.password = undefined;
  return user;
};
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
