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
 *     UpdateBranch:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *         address:
 *           type: string
 *           minLength: 5
 *           maxLength: 200
 *         phone:
 *           type: string
 *           pattern: '^[0-9\\-\\+\\(\\)\\s]+$'
 *       description: Optional fields to update a branch
 */

   export const createBranchSchema = Joi.object({
       name: Joi.string().min(2).max(100).required(),
       address: Joi.string().min(5).max(200).required(),
       phone: Joi.string().pattern(/^[0-9\-\+\(\)\s]+$/).required(),
       
   });

   export const updateBranchSchema = Joi.object({
       name: Joi.string().min(2).max(100),
       address: Joi.string().min(5).max(200),
       phone: Joi.string().pattern(/^[0-9\-\+\(\)\s]+$/),
       
   }).min(1);