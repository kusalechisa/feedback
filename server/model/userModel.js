import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a unique Username"],
      unique: [true, "Username exists"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      unique: false,
    },
    email: {
      type: String,
      required: [true, "Please provide a unique email"],
      unique: true,
    },
    adminType: {
      type: String,
    },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: Number },
    address: { type: String },
    profile: { type: String },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.statics.usersignup = async function (username, email, password) {
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const usernames = await this.findOne({ username });
  if (usernames) {
    throw Error("Username already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });

  return user;
};

userSchema.statics.adminsignup = async function (username, email, password) {
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const usernames = await this.findOne({ username });
  if (usernames) {
    throw Error("Username already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const admin = await this.create({ username, email, password: hash });

  return admin;
};

userSchema.statics.userlogin = async function (username, email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  if (user.username !== username) {
    throw Error("Incorrect username");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

export default mongoose.model("User", userSchema);
