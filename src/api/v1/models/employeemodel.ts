export interface Employee {
    id: number;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: number;
}

export interface CreateEmployeeDto {
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: number;
}

export interface UpdateEmployeeDto {
    name?: string;
    position?: string;
    department?: string;
    email?: string;
    phone?: string;
    branchId?: number;
}