export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
}

export const branches: Branch[] = [];

// Get all branches
export const getAllBranches = (): Branch[] => {
  return branches;
};

// Get branch by ID
export const getBranchById = (id: number): Branch | undefined => {
  return branches.find(branch => branch.id === id);
};

// Create a new branch
export const createBranch = (branch: Branch): Branch => {
  // Assign a unique id if not provided
  if (!branch.id) {
    branch.id = Date.now();
  }
  branches.push(branch);
  return branch;
};

// Update a branch by ID
export const updateBranch = (id: number, updatedBranch: Partial<Branch>): Branch | undefined => {
  const index = branches.findIndex(branch => branch.id === id);
  if (index === -1) return undefined;

  branches[index] = { ...branches[index], ...updatedBranch };
  return branches[index];
};

// Delete a branch by ID
export const deleteBranch = (id: number): boolean => {
  const index = branches.findIndex(branch => branch.id === id);
  if (index === -1) return false;

  branches.splice(index, 1);
  return true;
};
