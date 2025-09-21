import { Router } from "express";
import * as efficiencyKPIController from "./efficiencyKPI.controller.js";
import auth from '../../middleware/auth.js';

const router = Router();

// Create Efficiency KPI
router.post("/create", auth(), efficiencyKPIController.createEfficiencyKPI);

// Get all Efficiency KPIs
router.get("/all", auth(), efficiencyKPIController.getAllEfficiencyKPIs);

// Get Efficiency KPI by ID
router.get("/:id", auth(), efficiencyKPIController.getEfficiencyKPIById);

// Update Efficiency KPI
router.put("/update/:id", auth(), efficiencyKPIController.updateEfficiencyKPI);

// Delete Efficiency KPI
router.delete("/delete/:id", auth(), efficiencyKPIController.deleteEfficiencyKPI);

export default router;
