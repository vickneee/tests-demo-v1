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

// // Avoid OverwriteModelError
// module.exports = mongoose.models.Tour || mongoose.model("Tour", tourSchema);

module.exports = mongoose.model('Tour2', tourSchema);
