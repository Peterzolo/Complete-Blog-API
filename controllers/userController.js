const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

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

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const secretKeys = process.env.JWT_KEY;

    const token = jwt.sign(payload, secretKeys, { expiresIn: "1h" });
    res.status(200).send({ Success: token });

    //res.status(200).send(token);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.userLogIn = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(40).required(),
    email: Joi.string().min(3).max(40).email().required(),
    password: Joi.string().min(8).max(300).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Wrong Username or password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Password incorrect");

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const secretKeys = process.env.JWT_KEY;
    const token = jwt.sign(payload, secretKeys);
    res.send({ Success: token });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};


exports.userUpdate = async(req, res) =>{
   
  if(req.body.userId === req.params.id){
    if(req.body.password){
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set : req.body})   
      res.status(200).send(updatedUser)
    } catch (error) {
      res.status(500).send(error)
    }
  }else{
   res.status(400).send("Sorry you are not authorized")
  }

}
