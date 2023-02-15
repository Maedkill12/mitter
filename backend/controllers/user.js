const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../util/ApiError");

const createUser = async (req, res) => {
  const { name, username, email, password, bio, location, website } = req.body;
  const user = await User.create({
    name,
    username,
    email,
    password,
    bio,
    location,
    website,
  });
  res.status(StatusCodes.CREATED).json({ success: true, user });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, `Not found user with id : ${id}`);
  }
  res.status(StatusCodes.OK).json({ success: true, user });
};

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ success: true, users });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, name, email, password, bio, location, website, active } =
    req.body;
  let hash = password;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(password, salt);
  }
  const user = await User.findOneAndUpdate(
    { _id: id },
    { username, name, email, password: hash, bio, location, website, active },
    { runValidators: true, new: true }
  );
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, `Not found user with id : ${id}`);
  }
  res.status(StatusCodes.OK).json({ success: true, user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndRemove({ _id: id });
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, `Not found user with id : ${id}`);
  }
  res.status(StatusCodes.OK).json({ success: true, user });
};

module.exports = { createUser, getUser, getUsers, updateUser, deleteUser };
