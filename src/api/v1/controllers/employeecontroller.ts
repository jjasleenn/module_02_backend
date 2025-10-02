import { Request, Response } from "express";
import * as employeeService from "../services/employeeservice";
import { Employee } from "../../../data/employees";

export const getAllEmployees = (req: Request, res: Response): void => {
    const employees: Employee[] = employeeService.getAllEmployees();
    res.status(200).json({ message: "Get all employees", data: employees });
};

export const getEmployeeById = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);
    const employee: Employee | undefined = employeeService.getEmployeeById(id);
    res.status(200).json({ message: "Get employee by ID", data: employee });
};

export const createEmployee = (req: Request, res: Response): void => {
    const newEmployee: Employee = req.body;
    employeeService.createEmployee(newEmployee);
    res.status(201).json({ message: "Employee created", data: newEmployee });
};

export const updateEmployee = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);
    const updatedEmployee: Partial<Employee> = req.body;
    const result = employeeService.updateEmployee(id, updatedEmployee);
    res.status(200).json({ message: "Employee updated", data: result });
};

export const deleteEmployee = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);
    employeeService.deleteEmployee(id);
    res.status(200).json({ message: "Employee deleted" });
};
