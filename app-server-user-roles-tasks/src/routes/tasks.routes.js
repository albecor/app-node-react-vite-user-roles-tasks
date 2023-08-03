import { Router } from "express";
import { validateToken } from "../middlewares/validatorToken.js"
import { getTasks, getTask, createTask, deleteTask, updateTask } from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validatorSchema.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks", validateToken, getTasks);
router.get("/tasks/:id", validateToken, getTask);
router.post("/tasks", validateToken, validateSchema(createTaskSchema), createTask);
router.delete("/tasks/:id", validateToken, deleteTask);
router.put("/tasks/:id", validateToken, updateTask);

 

export default router;