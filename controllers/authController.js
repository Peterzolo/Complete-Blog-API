const bcrypt = require("bcrypt");
const Joi = require("joi");

const User = require("../models/UserModel");

exports.userRegister = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(40).required(),
    email: Joi.string().min(3).max(40).email().required(),
    password: Joi.string().min(8).max(300).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, email, password, profilePic } = req.body;

  try {
    const checkUser = await User.findOne({ username });
    if (checkUser)
      return res.status(400).send({ Message: " Already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
      profilePic,
    });
    const user = await newUser.save();
    res.status(200).send({ Success: "User successfully saved" });
  } catch (error) {
    res.status(500).send(error);
  }
};
