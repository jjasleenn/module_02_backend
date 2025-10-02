import { Request, Response } from "express";
import * as employeeService from "../services/employeeservice";
import { Employee } from "../../../data/employees";

// Get all employees
export const getAllEmployees = (req: Request, res: Response): void => {
  const employees: Employee[] = employeeService.getAllEmployees();
  res.status(200).json(employees); // tests expect array, not { message, data }
};

// Get employee by ID
export const getEmployeeById = (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const employee: Employee | undefined = employeeService.getEmployeeById(id);

  if (!employee) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }

  res.status(200).json(employee);
};

// Create a new employee
export const createEmployee = (req: Request, res: Response): void => {
  const { name, position, department, email, phone, branchId } = req.body;

  // validate required fields
  if (!name || !position || !department || !email || !phone || !branchId) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const newEmployee: Employee = {
    id: Date.now(), // auto generate ID
    name,
    position,
    department,
    email,
    phone,
    branchId,
  };

  employeeService.createEmployee(newEmployee);
  res.status(201).json(newEmployee);
};

// Update employee
export const updateEmployee = (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const updatedEmployee: Partial<Employee> = req.body;

  // no data provided
  if (!updatedEmployee || Object.keys(updatedEmployee).length === 0) {
    res.status(400).json({ message: "No update data provided" });
    return;
  }

  const result = employeeService.updateEmployee(id, updatedEmployee);

  if (!result) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }

  res.status(200).json(result);
};

// Delete employee
export const deleteEmployee = (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const deleted = employeeService.deleteEmployee(id);

  if (!deleted) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }

  res.status(200).json({ message: "Employee deleted successfully" });
};

export const getEmployeesByBranch = (req: Request, res: Response): void => {
  const branchId = Number(req.params.branchId);
  if (!branchId) {
    res.status(400).json({ message: "Branch ID is required" });
    return;
  }

  const employees = employeeService.getEmployeesByBranch(branchId);
  res.status(200).json(employees);
};

export const getEmployeesByDepartment = (req: Request, res: Response): void => {
  const department = req.params.department;
  if (!department) {
    res.status(400).json({ message: "Department is required" });
    return;
  }

  const employees = employeeService.getEmployeesByDepartment(department);
  res.status(200).json(employees);
};
