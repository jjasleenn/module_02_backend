import { Router } from "express";
import * as branchController from "../controllers/branchcontroller";

const router = Router();

// CRUD routes for branches
router.get("/", branchController.getAllBranches);
router.get("/:id", branchController.getBranchById);
router.post("/", branchController.createBranch);
router.put("/:id", branchController.updateBranch);
router.delete("/:id", branchController.deleteBranch);

export default router;
