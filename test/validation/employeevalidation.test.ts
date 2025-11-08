import { createEmployeeSchema,updateEmployeeSchema } from '../../src/api/v1/validation/employeevalidation';

describe('Employee Validation Schemas', () => {
    describe('createEmployeeSchema', () => {
        it('should validate correct employee data', () => {
            const validData = {
                name: 'John Doe',
                email: 'john.doe@company.com',
                position: 'Software Developer',
                phone: '555-123-4567',
                department: 'Engineering',
                branchId: 'branch123'
            };

            const { error } = createEmployeeSchema.validate(validData);

            expect(error).toBeUndefined();
        });

        it('should reject invalid email format', () => {
            const invalidData = {
                name: 'John Doe',
                email: 'not-an-email',
                position: 'Software Developer',
                phone: '555-123-4567',
                department: 'Engineering',
                branchId: 'branch123'
            };

            const { error } = createEmployeeSchema.validate(invalidData);

            expect(error).toBeDefined();
        });
    });

    describe('updateEmployeeSchema', () => {
        it('should validate partial employee update', () => {
            const validUpdateData = {
                phone: '555-999-8888'
            };

            const { error } = updateEmployeeSchema.validate(validUpdateData);

            expect(error).toBeUndefined();
        });

        it('should reject empty update object', () => {
            const emptyUpdate = {};

            const { error } = updateEmployeeSchema.validate(emptyUpdate);

            expect(error).toBeDefined();
        });
    });
});
