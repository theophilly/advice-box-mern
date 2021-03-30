import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      max: 50,
    },
    lastname: {
      type: String,
      trim: true,
      max: 50,
    },
    hashPassword: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50,
    },
    userName: {
      type: String,
      required: true,
      index: true,
      trim: true,
      min: 3,
      max: 50,
    },
    profilePicture: {
      type: String,
    },
    about: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.hashPassword = bcrypt.hashSync(password, 10);
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hashPassword);
  },
};

export default mongoose.model("User", userSchema);
