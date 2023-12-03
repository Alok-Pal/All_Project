export interface UserModal {
    name: string,
    email: string,
    password: string,
    mobile: number,
    address: string,
    pincode: number,
    roleId : string
}

export interface UserLoginnModal {
    id ? : string,
    email: string,
    password: string
}

export interface CreateUser{
    RoleName : string,
    permissionId : string[];
}