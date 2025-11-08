import { Request, Response } from "express";
import * as employeeService from "../services/employeeservice";
import { Employee } from "../models/employeemodel";
import {
    createSuccessResponse,
    createErrorResponse,
    SuccessResponse,
    ErrorResponse,
} from "../models/ApiResponse";

// Get all employees
export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.getAllEmployees();
        
        const response: SuccessResponse<Employee[]> = createSuccessResponse(
            "Employees retrieved successfully",
            employees
        );
        
        res.status(200).json(response);
    } catch (error) {
        const errorResponse: ErrorResponse = createErrorResponse(
            "Failed to retrieve employees"
        );
        res.status(500).json(errorResponse);
    }
};

// Get employee by ID
export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = Number(req.params.id);
        
        if (isNaN(id)) {
            const errorResponse: ErrorResponse = createErrorResponse(
                "Invalid employee ID",
                [{ field: "id", message: "Employee ID must be a valid number" }]
            );
            res.status(400).json(errorResponse);
            return;
        }

        const employee: Employee | undefined = await employeeService.getEmployeeById(id);

        if (!employee) {
            const errorResponse: ErrorResponse = createErrorResponse("Employee not found");
            res.status(404).json(errorResponse);
            return;
        }

        const response: SuccessResponse<Employee> = createSuccessResponse(
            "Employee retrieved successfully",
            employee
        );
        
        res.status(200).json(response);
    } catch (error) {
        const errorResponse: ErrorResponse = createErrorResponse(
            "Failed to retrieve employee"
        );
        res.status(500).json(errorResponse);
    }
};

// Create a new employee
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, position, department, email, phone, branchId } = req.body;

        // Validate required fields (will be replaced by Joi middleware)
        if (!name || !position || !department || !email || !phone || !branchId) {
            const errorResponse: ErrorResponse = createErrorResponse(
                "Missing required fields",
                [
                    { 
                        field: "body", 
                        message: "All fields are required: name, position, department, email, phone, branchId" 
                    }
                ]
            );
            res.status(400).json(errorResponse);
            return;
        }

        const newEmployee: Employee = {
            id: Date.now(), // Auto-generate ID
            name,
            position,
            department,
            email,
            phone,
            branchId,
        };

        const createdEmployee = await employeeService.createEmployee(newEmployee);
        
        const response: SuccessResponse<Employee> = createSuccessResponse(
            "Employee created successfully",
            createdEmployee
        );
        
        res.status(201).json(response);
    } catch (error) {
        const errorResponse: ErrorResponse = createErrorResponse(
            "Failed to create employee"
        );
        res.status(500).json(errorResponse);
    }
};

// Update employee
export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = Number(req.params.id);
        
        if (isNaN(id)) {
            const errorResponse: ErrorResponse = createErrorResponse(
                "Invalid employee ID",
                [{ field: "id", message: "Employee ID must be a valid number" }]
            );
            res.status(400).json(errorResponse);
            return;
        }

        const updatedEmployee: Partial<Employee> = req.body;

        // Validate that update data is provided
        if (!updatedEmployee || Object.keys(updatedEmployee).length === 0) {
            const errorResponse: ErrorResponse = createErrorResponse(
                "No update data provided",
                [{ field: "body", message: "At least one field must be provided for update" }]
            );
            res.status(400).json(errorResponse);
            return;
        }

        const result = await employeeService.updateEmployee(id, updatedEmployee);

        if (!result) {
            const errorResponse: ErrorResponse = createErrorResponse("Employee not found");
            res.status(404).json(errorResponse);
            return;
        }

        const response: SuccessResponse<Employee> = createSuccessResponse(
            "Employee updated successfully",
            result
        );
        
        res.status(200).json(response);
    } catch (error) {
        const errorResponse: ErrorResponse = createErrorResponse(
            "Failed to update employee"
        );
        res.status(500).json(errorResponse);
    }
};

// Delete employee
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = Number(req.params.id);
        
        if (isNaN(id)) {
            const errorResponse: ErrorResponse = createErrorResponse(
                "Invalid employee ID",
                [{ field: "id", message: "Employee ID must be a valid number" }]
            );
            res.status(400).json(errorResponse);
            return;
        }

        const deleted = await employeeService.deleteEmployee(id);

        if (!deleted) {
            const errorResponse: ErrorResponse = createErrorResponse("Employee not found");
            res.status(404).json(errorResponse);
            return;
        }

        const response: SuccessResponse<null> = createSuccessResponse(
            "Employee deleted successfully",
            null
        );
        
        res.status(200).json(response);
    } catch (error) {
        const errorResponse: ErrorResponse = createErrorResponse(
            "Failed to delete employee"
        );
        res.status(500).json(errorResponse);
    }
};

// Get employees by branch
export const getEmployeesByBranch = async (req: Request, res: Response): Promise<void> => {
    try {
        const branchId = Number(req.params.branchId);
        
        if (!branchId || isNaN(branchId)) {
            const errorResponse: ErrorResponse = createErrorResponse(
                "Invalid branch ID",
                [{ field: "branchId", message: "Branch ID must be a valid number" }]
            );
            res.status(400).json(errorResponse);
            return;
        }

        const employees = await employeeService.getEmployeesByBranch(branchId);
        
        const response: SuccessResponse<Employee[]> = createSuccessResponse(
            `Employees retrieved successfully for branch ${branchId}`,
            employees
        );
        
        res.status(200).json(response);
    } catch (error) {
        const errorResponse: ErrorResponse = createErrorResponse(
            "Failed to retrieve employees by branch"
        );
        res.status(500).json(errorResponse);
    }
};

// Get employees by department
export const getEmployeesByDepartment = async (req: Request, res: Response): Promise<void> => {
    try {
        const department = req.params.department;
        
        if (!department || department.trim() === "") {
            const errorResponse: ErrorResponse = createErrorResponse(
                "Department is required",
                [{ field: "department", message: "Department parameter cannot be empty" }]
            );
            res.status(400).json(errorResponse);
            return;
        }

        const employees = await employeeService.getEmployeesByDepartment(department);
        
        const response: SuccessResponse<Employee[]> = createSuccessResponse(
            `Employees retrieved successfully for department: ${department}`,
            employees
        );
        
        res.status(200).json(response);
    } catch (error) {
        const errorResponse: ErrorResponse = createErrorResponse(
            "Failed to retrieve employees by department"
        );
        res.status(500).json(errorResponse);
    }
};