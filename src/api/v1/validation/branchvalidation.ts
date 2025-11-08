import Joi from 'joi';

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