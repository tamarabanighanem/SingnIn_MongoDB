const User = require("../model/user");
const errorHandler = require("../middleware/500");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Login 
const Login = async (req, res) => {
  const { email, password } = req.body;

  if(email !== req.user.email) 
  res.status(403).json({ message: "Invalid Email" });

  else if(password !== req.user.password)
  res.status(403).json({ message: "Invalid Password" });

  else 
   res.json(req.user)
};


// SignUp 
const SignUp = async (req, res) => {
  const { username, email, password } = req.body;

  User.find()
    .then((data) => {
      data.map((user) => {
        if (user.email === email) return res.json("Email already taken.");
      });
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });

const accessToken = jwt.sign(
    {
      email: email,
      password: password,
      username: username
    },
    process.env.ACCESS_TOKEN_SECRET
  );

const hashedPwd = await bcrypt.hash(password, 10);
const newUser = new User({
    username: username,
    email: email,
    password: hashedPwd,
    token: accessToken,
  });
  const addUser = await newUser.save();
  res.json(addUser);
};

module.exports = {
  Login,
  SignUp,
};
