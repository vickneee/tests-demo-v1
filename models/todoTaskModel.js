const mongoose = require("mongoose");

const todoTaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true, default: "" },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, required: true, default: false },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

// // Add virtual field id
// todoTaskSchema.set('toJSON', {
//   virtuals: true,
//   transform: (doc, ret) => {
//     ret.id = ret._id;
//     return ret;
//   },
// });

module.exports = mongoose.model("TodoTask", todoTaskSchema);
