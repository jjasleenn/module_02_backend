import { Router } from "express";
import * as employeeController from "../controllers/employeecontroller";
import { createEmployeeSchema, updateEmployeeSchema } from '../validation/employeevalidation';
import { validate } from "../middleware/validationmiddleware";

const router = Router();

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post('/', validate(createEmployeeSchema), employeeController.createEmployee);
router.put('/:id', validate(updateEmployeeSchema), employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

router.get("/branch/:branchId", employeeController.getEmployeesByBranch);
router.get("/department/:department", employeeController.getEmployeesByDepartment);

export default router;
