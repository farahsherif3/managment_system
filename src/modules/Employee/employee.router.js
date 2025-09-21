import { Router } from "express";
import * as employeeController from "./employee.controller.js";
import auth from '../../middleware/auth.js'
const router = Router();

// Create employee
router
.post("/signUp", employeeController.signUp)
.get("/logIn", employeeController.logIn)
.get("/getAllEmployees", employeeController.getAllEmployees)
.get("/:id", employeeController.getEmployeeById)
.put("/updateEmployee",auth(), employeeController.updateEmployee)
.delete("/deleteEmployee",auth(), employeeController.deleteEmployee)

export default router;