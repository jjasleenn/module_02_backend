import { employees, Employee } from "../../../data/employees";

// Get all employees
export const getAllEmployees = (): Employee[] => {
  return employees;
};

// Get employee by ID
export const getEmployeeById = (id: number): Employee | undefined => {
  return employees.find(emp => emp.id === id);
};

// Create a new employee
export const createEmployee = (employee: Employee): Employee => {
  employees.push(employee);
  return employee;
};

// Update employee by ID
export const updateEmployee = (id: number, updated: Partial<Employee>): Employee | null => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return null;

  employees[index] = { ...employees[index], ...updated };
  return employees[index];
};

// Delete employee by ID
export const deleteEmployee = (id: number): boolean => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return false;

  employees.splice(index, 1);
  return true;
};

export const getEmployeesByBranch = (branchId: number): Employee[] => {
   return employees.filter(emp => emp.branchId === branchId);
};

export const getEmployeesByDepartment = (department: string): Employee[] => {
  return employees.filter(emp => emp.department === department);
};