import { branches, Branch } from "../../../data/branches";

// Get all branches
export const getAllBranches = (): Branch[] => {
  return branches;
};

// Get branch by ID
export const getBranchById = (id: number): Branch | undefined => {
  return branches.find(branch => branch.id === id);
};

// Create a new branch
export const createBranch = (newBranch: Branch): void => {
  branches.push(newBranch);
};

// Update a branch by ID
export const updateBranch = (id: number, updatedBranch: Partial<Branch>): Branch | undefined => {
  const index = branches.findIndex(branch => branch.id === id);
  if (index !== -1) {
    branches[index] = { ...branches[index], ...updatedBranch };
    return branches[index];
  }
  return undefined;
};

// Delete a branch by ID
export const deleteBranch = (id: number): void => {
  const index = branches.findIndex(branch => branch.id === id);
  if (index !== -1) {
    branches.splice(index, 1);
  }
};
