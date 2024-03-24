import express from 'express';
import protect from "../middleware/authMiddleware.mjs";
import todoRoutes from "../controllers/todoControllers.mjs";
const { createTodo, fetchTodos, updateTodo, toggleCompletedStatus, toggleStarredStatus, deleteTodo } = todoRoutes;

const router = express.Router();

router.route("/").get(protect, fetchTodos);
router.route("/").post(protect, createTodo);
router.route("/:id").put(protect, updateTodo);
router.route("/comp/:id").patch(protect, toggleCompletedStatus);
router.route("/star/:id").patch(protect, toggleStarredStatus);
router.route("/:id").delete(protect, deleteTodo);

export default router;