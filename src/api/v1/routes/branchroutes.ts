import { Router } from "express";
import * as branchController from "../controllers/branchcontroller";

const router = Router();

// CRUD routes for branches
/**
 * @openapi
 * /branches:
 *   get:
 *     summary: Retrieve all branches
 *     tags: [Branches]
 *     responses:
 *       '200':
 *         description: Successfully fetched all branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateBranch'
 */
router.get("/", branchController.getAllBranches);
/**
 * @openapi
 * /branches/{id}:
 *   get:
 *     summary: Get a specific branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the branch
 *     responses:
 *       '200':
 *         description: Branch details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBranch'
 *       '404':
 *         description: Branch not found
 */

router.get("/:id", branchController.getBranchById);
/**
 * @openapi
 * /branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBranch'
 *     responses:
 *       '201':
 *         description: Branch created successfully
 */
router.post("/", branchController.createBranch);
/**
 * @openapi
 * /branches/{id}:
 *   put:
 *     summary: Update an existing branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBranch'
 *     responses:
 *       '200':
 *         description: Branch updated successfully
 */
router.put("/:id", branchController.updateBranch);
/**
 * @openapi
 * /branches/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Branch deleted successfully
 *       '404':
 *         description: Branch not found
 */
router.delete("/:id", branchController.deleteBranch);

export default router;
