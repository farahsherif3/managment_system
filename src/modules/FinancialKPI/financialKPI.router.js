import { Router } from "express";
import * as financialKPIController from "./financialKPI.controller.js";
import auth from '../../middleware/auth.js';

const router = Router();
router.post("/create", auth(), financialKPIController.createFinancialKPI);
router.get("/all", auth(), financialKPIController.getAllFinancialKPIs);
router.get("/:id", auth(), financialKPIController.getFinancialKPIById);
router.put("/update/:id", auth(), financialKPIController.updateFinancialKPI);
router.delete("/delete/:id", auth(), financialKPIController.deleteFinancialKPI);
export default router;
