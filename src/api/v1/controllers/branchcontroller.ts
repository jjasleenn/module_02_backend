import { Request, Response } from "express";
import * as branchService from "../services/branchservices";
import { Branch } from "../../../data/branches";

// Get all branches
export const getAllBranches = (req: Request, res: Response): void => {
  const data = branchService.getAllBranches();
  res.status(200).json(data);
};

// Get branch by ID
export const getBranchById = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const branch = branchService.getBranchById(id);

  if (!branch) {
    res.status(404).json({ message: "Branch not found" });
    return;
  }

  res.status(200).json(branch);
};

// Create branch
export const createBranch = (req: Request, res: Response): void => {
  const { name, address, phone } = req.body;

  if (!name || !address || !phone) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const newBranch = branchService.createBranch({ id: 0, name, address, phone });
  res.status(201).json(newBranch); // Send directly, no "data" wrapper
};

// Update branch
export const updateBranch = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const updatedData: Partial<Branch> = req.body;

  if (!updatedData || Object.keys(updatedData).length === 0) {
    res.status(400).json({ message: "No update data provided" });
    return;
  }

  const updatedBranch = branchService.updateBranch(id, updatedData);
  if (!updatedBranch) {
    res.status(404).json({ message: "Branch not found" });
    return;
  }

  res.status(200).json(updatedBranch);
};

// Delete branch
export const deleteBranch = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const deleted = branchService.deleteBranch(id);

  if (!deleted) {
    res.status(404).json({ message: "Branch not found" });
    return;
  }

  res.status(200).json({ message: "Branch deleted successfully" });
};
