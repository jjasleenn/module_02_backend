import { 
    createBranchSchema, 
    updateBranchSchema 
} from '../../src/api/v1/validation/branchvalidation';

describe('Branch Validation Schemas', () => {
    describe('createBranchSchema', () => {
        it('should validate correct branch data', () => {
            const validData = {
                name: 'Downtown Branch',
                address: '123 Main Street, City, State 12345',
                phone: '555-987-6543'
            };

            const { error } = createBranchSchema.validate(validData);

            expect(error).toBeUndefined();
        });

        it('should reject invalid phone number', () => {
            const invalidData = {
                name: 'Downtown Branch',
                address: '123 Main Street, City, State 12345',
                phone: 'not-a-phone'
            };

            const { error } = createBranchSchema.validate(invalidData);

            expect(error).toBeDefined();
        });
    });

    describe('updateBranchSchema', () => {
        it('should validate partial branch update', () => {
            const validUpdateData = {
                phone: '555-111-2222'
            };

            const { error } = updateBranchSchema.validate(validUpdateData);

            expect(error).toBeUndefined();
        });

        it('should reject empty update object', () => {
            const emptyUpdate = {};

            const { error } = updateBranchSchema.validate(emptyUpdate);

            expect(error).toBeDefined();
        });
    });
});