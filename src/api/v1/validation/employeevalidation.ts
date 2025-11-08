import Joi from 'joi';

   export const createEmployeeSchema = Joi.object({
       name: Joi.string().min(2).max(100).required(),
       email: Joi.string().email().required(),
       position: Joi.string().min(2).max(100).required(),
       branchId: Joi.string().required(),
       department: Joi.string().required(),
       phone: Joi.string().required(),
   });

   export const updateEmployeeSchema = Joi.object({
       name: Joi.string().min(2).max(100),
       email: Joi.string().email(),
       position: Joi.string().min(2).max(100),
       branchId: Joi.string(),
       department: Joi.string().required(),
       phone: Joi.string().required(),
       
   }).min(1); 