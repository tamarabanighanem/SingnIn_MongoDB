const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT")

router.post("/login", verifyJWT,  userController.Login);
router.post("/signUp", userController.SignUp);

module.exports = router;