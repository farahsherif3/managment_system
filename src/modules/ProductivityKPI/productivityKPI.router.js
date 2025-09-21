import { Router } from "express";
import * as productivityKPIController from "./productivityKPI.controller.js";
import auth from '../../middleware/auth.js';

const router = Router();
router.post("/create", auth(), productivityKPIController.createProductivityKPI);
router.get("/all", auth(), productivityKPIController.getAllProductivityKPIs);
router.get("/:id", auth(), productivityKPIController.getProductivityKPIById);
router.put("/update/:id", auth(), productivityKPIController.updateProductivityKPI);
router.delete("/delete/:id", auth(), productivityKPIController.deleteProductivityKPI);
export default router;
