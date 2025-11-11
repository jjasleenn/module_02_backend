import Joi from 'joi';
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateEmployee:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - position
 *         - branchId
 *         - department
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: Full name of the employee
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: Employee email address
 *           example: "john@example.com"
 *         position:
 *           type: string
 *           description: Job title or position
 *           example: "Sales Executive"
 *         branchId:
 *           type: string
 *           description: ID of the branch where the employee works
 *           example: "64b2fa4d1b2e9e35a5c6d0c9"
 *         department:
 *           type: string
 *           description: Department name
 *           example: "Sales"
 *         phone:
 *           type: string
 *           description: Employee phone number
 *           example: "+1 (555) 765-4321"
 */
   export const createEmployeeSchema = Joi.object({
       name: Joi.string().min(2).max(100).required(),
       email: Joi.string().email().required(),
       position: Joi.string().min(2).max(100).required(),
       branchId: Joi.string().required(),
       department: Joi.string().required(),
       phone: Joi.string().required(),
   });
/**
 * @openapi
 * components:
 *   schemas:
 *      UpdateEmployee:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         position:
 *           type: string
 *         branchId:
 *           type: string
 *         department:
 *           type: string
 *         phone:
 *           type: string
 *       description: Optional fields to update an employee
 */
   export const updateEmployeeSchema = Joi.object({
       name: Joi.string().min(2).max(100),
       email: Joi.string().email(),
       position: Joi.string().min(2).max(100),
       branchId: Joi.string(),
       department: Joi.string().required(),
       phone: Joi.string().required(),
       
   }).min(1); 