import { Router } from "express";
import * as taskController from "./task.controller.js";
import auth from '../../middleware/auth.js';

const router = Router();


router
.post("/createTask", auth(), taskController.createTask)
.get("/getAllTasks", taskController.getAllTasks)
.get("/getById", auth(), taskController.getTaskById)
.put("/updateTask", auth(), taskController.updateTask)
.delete("/deleteTask", auth(), taskController.deleteTask)
export default router;