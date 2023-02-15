const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: [true, "Username must be provided"],
      unique: true,
      match: [/^\S+$/, "Username must not contain spaces"],
    },
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: [true, "Username must be provided"],
    },
    email: {
      type: String,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      required: [true, "Email must be provided"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password must be provided"],
      minlength: 8,
    },
    bio: {
      type: String,
      minlength: 3,
      maxlength: 200,
    },
    location: {
      type: String,
      minlength: 3,
      maxlength: 50,
    },
    website: {
      type: String,
      minlength: 3,
      maxlength: 50,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
