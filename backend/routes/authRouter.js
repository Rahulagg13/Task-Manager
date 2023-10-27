const router = require("express").Router();
const {
  signup,
  signin,
  signout,
  forgetPassword,
  resetPassword,
} = require("../controller/auth");
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/signout").get(signout);
router.route("/forgetPassword").post(forgetPassword);
router.route("/resetPassword/:token").patch(resetPassword);

module.exports = router;
