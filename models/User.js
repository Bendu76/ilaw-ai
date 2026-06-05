const mongoose =
  require("mongoose");

const UserSchema =
  new mongoose.Schema({

    fullname: String,

    email: String,

    password: String,

    credits: {
      type: Number,
      default: 1
    },

    isPaid: {
  type: Boolean,
  default: false
},

    role: {
      type: String,
      default: "teacher"
    }

  });

module.exports =
  mongoose.model(
    "User",
    UserSchema
  );