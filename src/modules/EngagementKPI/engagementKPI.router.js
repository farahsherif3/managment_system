import { Router } from "express";
import * as engagementKPIController from "./engagementKPI.controller.js";
import auth from '../../middleware/auth.js';

const router = Router();
router.post("/create", auth(), engagementKPIController.createEngagementKPI);
router.get("/all", auth(), engagementKPIController.getAllEngagementKPIs);
router.get("/:id", auth(), engagementKPIController.getEngagementKPIById);
router.put("/update", auth(), engagementKPIController.updateEngagementKPI);
router.delete("/delete", auth(), engagementKPIController.deleteEngagementKPI);
export default router;
