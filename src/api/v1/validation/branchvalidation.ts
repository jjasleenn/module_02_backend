import Joi from 'joi';
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBranch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: Name of the branch
 *           example: "Downtown Office"
 *         address:
 *           type: string
 *           minLength: 5
 *           maxLength: 200
 *           description: Physical address of the branch
 *           example: "123 Main Street, Springfield"
 *         phone:
 *           type: string
 *           pattern: '^[0-9\\-\\+\\(\\)\\s]+$'
 *           description: Contact phone number
 *           example: "+1 (555) 123-4567"
 *
*/
   export const createBranchSchema = Joi.object({
       name: Joi.string().min(2).max(100).required(),
       address: Joi.string().min(5).max(200).required(),
       phone: Joi.string().pattern(/^[0-9\-\+\(\)\s]+$/).required(),
       
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
   export const updateBranchSchema = Joi.object({
       name: Joi.string().min(2).max(100),
       address: Joi.string().min(5).max(200),
       phone: Joi.string().pattern(/^[0-9\-\+\(\)\s]+$/),
       
   }).min(1);