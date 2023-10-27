const router = require("express").Router();

const taskController = require("../controller/taskController");
const { isLoggedIn, Authorization } = require("../controller/auth");

router.use( Authorization);
router.route("/alltask").get(taskController.getAlltask);
router.route("/newtask").post(taskController.createTask);
router
  .route("/:id")
  .get(taskController.getTask)
  .delete(taskController.deleteTask)
  .patch(taskController.updateTask);

module.exports = router;
