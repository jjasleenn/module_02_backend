import { Request, Response } from "express";
import * as branchService from "../services/branchservices";
import { Branch } from "../../../data/branches";

export const getAllBranches = (req: Request, res: Response): void => {
  const data: Branch[] = branchService.getAllBranches();
  res.status(200).json({ message: "Get all branches", data });
};

export const getBranchById = (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const data: Branch | undefined = branchService.getBranchById(id);
  res.status(200).json({ message: "Get branch by ID", data });
};

export const createBranch = (req: Request, res: Response): void => {
  const newBranch: Branch = req.body;
  branchService.createBranch(newBranch);
  res.status(201).json({ message: "Branch created", data: newBranch });
};

export const updateBranch = (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const updatedBranch: Partial<Branch> = req.body;
  const result = branchService.updateBranch(id, updatedBranch);
  res.status(200).json({ message: "Branch updated", data: result });
};

export const deleteBranch = (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  branchService.deleteBranch(id);
  res.status(200).json({ message: "Branch deleted" });
};
