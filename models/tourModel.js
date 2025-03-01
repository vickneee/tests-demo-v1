const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    user_id: { // Added user_id field
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the User model
    },
  },
  {timestamps: true},
);

// // Add virtual field id
// tourSchema.set('toJSON', {
//   virtuals: true,
//   transform: (doc, ret) => {
//     ret.id = ret._id;
//     return ret;
//   },
// });

module.exports = mongoose.model('Tour', tourSchema);
