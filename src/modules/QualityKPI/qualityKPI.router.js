import { Router } from "express";
import * as qualityKPIController from "./qualityKPI.controller.js";
import auth from '../../middleware/auth.js';

const router = Router();
router.post("/create", auth(), qualityKPIController.createQualityKPI);
router.get("/all", auth(), qualityKPIController.getAllQualityKPIs);
router.get("/:id", auth(), qualityKPIController.getQualityKPIById);
router.put("/update/:id", auth(), qualityKPIController.updateQualityKPI);
router.delete("/delete/:id", auth(), qualityKPIController.deleteQualityKPI);
export default router;
