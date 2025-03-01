const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const validator = require('validator');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    phone_number: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    gender: {
      type: String,
      required: [true, 'Please add a gender'],
    },
    date_of_birth: {
      type: Date, required: [true, 'Please add a date of birth'],
    },
    membership_status: {
      type: String,
      required: [true, 'Please add a membership status'],
    },
  },
  {
    timestamps: true,
  },
);

// // Add virtual field id
// userSchema.set('toJSON', {
//   virtuals: true,
//   transform: (doc, ret) => {
//     ret.id = ret._id;
//     return ret;
//   },
// });

// // Static signup method
// userSchema.statics.signup = async function(
//   name, email, password, phone_number, gender, date_of_birth,
//   membership_status,
// ) {
//   // Validation
//   if (!name || !email || !password || !phone_number || !gender ||
//     !date_of_birth || !membership_status) {
//     throw Error('All fields are required');
//   }
//   if (!validator.isEmail(email)) {
//     throw Error('Invalid email format');
//   }
//   if (!validator.isStrongPassword(password)) {
//     throw Error(
//       'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol');
//   }
//
//   const userExists = await this.findOne({email});
//   if (userExists) {
//     throw new Error('Email is already registered');
//   }
//
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);
//
//   const user = await this.create({
//     name,
//     email,
//     password: hashedPassword,
//     phone_number,
//     gender,
//     date_of_birth,
//     membership_status,
//   });
//
//   return user;
// };
//
// // Static login method
// userSchema.statics.login = async function(email, password) {
//   if (!email || !password) {
//     throw Error('All fields must be filled');
//   }
//
//   const user = await this.findOne({email});
//   if (!user) {
//     throw Error('Incorrect email or password');
//   }
//
//   const match = await bcrypt.compare(password, user.password);
//   if (!match) {
//     throw Error('Incorrect email or password');
//   }
//
//   return user;
// };

module.exports = mongoose.model('User', userSchema);
