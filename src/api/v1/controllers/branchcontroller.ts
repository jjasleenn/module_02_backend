import { Request, Response } from "express";
import * as branchService from "../services/branchservices";
import {Branch } from "../models/branchmodel";
import { SuccessResponse, ErrorResponse } from "../models/ApiResponse";

// Get all branches
export const getAllBranches = async (req: Request, res: Response): Promise<void> => {
    try {
        const branches: Branch[] = await branchService.getAllBranches();
        
        const response: SuccessResponse<Branch[]> = {
            success: true,
            message: "Branches retrieved successfully",
            data: branches
        };
        
        res.status(200).json(response);
    } catch (error) {
        const errorResponse: ErrorResponse = {
            success: false,
            message: "Failed to retrieve branches"
        };
        res.status(500).json(errorResponse);
    }
};

// Get branch by ID
export const getBranchById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = Number(req.params.id);
        
        if (isNaN(id)) {
            const errorResponse: ErrorResponse = {
                success: false,
                message: "Invalid branch ID",
                errors: [{ field: "id", message: "Branch ID must be a valid number" }]
            };
            res.status(400).json(errorResponse);
            return;
        }

        const branch: Branch | undefined = await branchService.getBranchById(id);

        if (!branch) {
            const errorResponse: ErrorResponse = {
                success: false,
                message: "Branch not found"
            };
            res.status(404).json(errorResponse);
            return;
        }

        const response: SuccessResponse<Branch> = {
            success: true,
            message: "Branch retrieved successfully",
            data: branch
        };
        
        res.status(200).json(response);
    } catch (error) {
        const errorResponse: ErrorResponse = {
            success: false,
            message: "Failed to retrieve branch"
        };
        res.status(500).json(errorResponse);
    }
};

// Create a new branch
export const createBranch = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, address, phone } = req.body;

        // Validate required fields (will be replaced by Joi middleware)
        if (!name || !address || !phone) {
            const errorResponse: ErrorResponse = {
                success: false,
                message: "Missing required fields",
                errors: [
                    { 
                        field: "body", 
                        message: "All fields are required: name, address, phone" 
                    }
                ]
            };
            res.status(400).json(errorResponse);
            return;
        }

        const newBranch: Branch = {
            id: Date.now(),
            name,
            address,
            phone,
        };

        const createdBranch = await branchService.createBranch(newBranch);
        
        const response: SuccessResponse<Branch> = {
            success: true,
            message: "Branch created successfully",
            data: createdBranch
        };
        
        res.status(201).json(response);
    } catch (error) {
        const errorResponse: ErrorResponse = {
            success: false,
            message: "Failed to create branch"
        };
        res.status(500).json(errorResponse);
    }
};

// Update branch
export const updateBranch = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = Number(req.params.id);
        
        if (isNaN(id)) {
            const errorResponse: ErrorResponse = {
                success: false,
                message: "Invalid branch ID",
                errors: [{ field: "id", message: "Branch ID must be a valid number" }]
            };
            res.status(400).json(errorResponse);
            return;
        }

        const updatedBranch: Partial<Branch> = req.body;

        if (!updatedBranch || Object.keys(updatedBranch).length === 0) {
            const errorResponse: ErrorResponse = {
                success: false,
                message: "No update data provided",
                errors: [{ field: "body", message: "At least one field must be provided for update" }]
            };
            res.status(400).json(errorResponse);
            return;
        }

        const result = await branchService.updateBranch(id, updatedBranch);

        if (!result) {
            const errorResponse: ErrorResponse = {
                success: false,
                message: "Branch not found"
            };
            res.status(404).json(errorResponse);
            return;
        }

        const response: SuccessResponse<Branch> = {
            success: true,
            message: "Branch updated successfully",
            data: result
        };
        
        res.status(200).json(response);
    } catch (error) {
        const errorResponse: ErrorResponse = {
            success: false,
            message: "Failed to update branch"
        };
        res.status(500).json(errorResponse);
    }
};

// Delete branch
export const deleteBranch = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = Number(req.params.id);
        
        if (isNaN(id)) {
            const errorResponse: ErrorResponse = {
                success: false,
                message: "Invalid branch ID",
                errors: [{ field: "id", message: "Branch ID must be a valid number" }]
            };
            res.status(400).json(errorResponse);
            return;
        }

        const deleted = await branchService.deleteBranch(id);

        if (!deleted) {
            const errorResponse: ErrorResponse = {
                success: false,
                message: "Branch not found"
            };
            res.status(404).json(errorResponse);
            return;
        }

        const response: SuccessResponse<null> = {
            success: true,
            message: "Branch deleted successfully",
            data: null
        };
        
        res.status(200).json(response);
    } catch (error) {
        const errorResponse: ErrorResponse = {
            success: false,
            message: "Failed to delete branch"
        };
        res.status(500).json(errorResponse);
    }
};
