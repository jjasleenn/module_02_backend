import { Router } from "express";
import * as employeeController from "../controllers/employeecontroller";
import { createEmployeeSchema, updateEmployeeSchema } from '../validation/employeevalidation';
import { validate } from "../middleware/validationmiddleware";

const router = Router();
/**
 * @openapi
 * tags:
 *   name: Employees
 *   description: API endpoints for managing employee data
 */

/**
 * @openapi
 * /employees:
 *   get:
 *     summary: Retrieve all employees
 *     tags: [Employees]
 *     responses:
 *       '200':
 *         description: Successfully fetched all employees
 */
router.get("/", employeeController.getAllEmployees);
/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     summary: Get a specific employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee's ID
 *     responses:
 *       '200':
 *         description: Employee details retrieved successfully
 *       '404':
 *         description: Employee not found
 */
router.get("/:id", employeeController.getEmployeeById);
/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmployee'
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *       '400':
 *         description: Invalid input
 */
router.post('/', validate(createEmployeeSchema), employeeController.createEmployee);
/**
 * @openapi
 * /employees/{id}:
 *   put:
 *     summary: Update employee details
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmployee'
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *       '404':
 *         description: Employee not found
 */
router.put('/:id', validate(updateEmployeeSchema), employeeController.updateEmployee);
/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Employee deleted successfully
 *       '404':
 *         description: Employee not found
 */
router.delete("/:id", employeeController.deleteEmployee);
/**
 * @openapi
 * /employees/branch/{branchId}:
 *   get:
 *     summary: Get all employees for a specific branch
 *     tags: [Employees]
 *     parameters:
 *       - name: branchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employees retrieved for this branch
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateEmployee'
 */
router.get("/branch/:branchId", employeeController.getEmployeesByBranch);
/**
 * @openapi
 * /employees/department/{department}:
 *   get:
 *     summary: Get employees by department
 *     tags: [Employees]
 *     parameters:
 *       - name: department
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateEmployee'
 */
router.get("/department/:department", employeeController.getEmployeesByDepartment);

export default router;
