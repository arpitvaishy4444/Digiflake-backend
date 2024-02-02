const express = require("express");
const router = express.Router();
const {registerUser, loginUser, logoutUser, resetPassword} = require("../Controllers/UserController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/reset/:token").put(resetPassword);
module.exports = router;