const router = require("express").Router();
const {
  getAllUser,
  getCurrentUser,
  deactivateUser,
  deactivateAnyUser,
} = require("../controller/userController");
const { isLoggedIn, Authorization, restrictTo } = require("../controller/auth");

router.use(Authorization);
router.route("/").get(getCurrentUser);
router.route("/deactivate").get(deactivateUser);
router.use(Authorization, restrictTo("[admin]"));
router.route("/deactivateUser/:id").get(deactivateAnyUser);
router.route("/allUser").get(getAllUser);

module.exports = router;
