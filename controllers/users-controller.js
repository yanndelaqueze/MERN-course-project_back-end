const HttpError = require("../models/http-errors");
const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const User = require("../models/user");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Arthur Fleck",
    email: "test@test.com",
    password: "password",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs. Please check your data", 422);
  }

  const { name, email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name: name,
    email: email,
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocJn1gT2oCyv4yEOXS2B3RgnJHd0kysFpW0gXBnw33pDYgqs=s576-c-no",
    password: password,
    places: places,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("ERROR !! Signing up failed", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Could not identify user...", 401);
  }

  res.json({ message: "Logged in !!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
