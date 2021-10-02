const bcrypt = require("bcrypt");

const User = require("../models/UserModel");

exports.userRegister = async (req, res) => {
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
    res.status(200).send(user._id, user.email);
  } catch (error) {
    res.status(500).send(error);
  }
};
