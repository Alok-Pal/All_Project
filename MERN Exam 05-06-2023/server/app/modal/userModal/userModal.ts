export interface UserModal {
    name: string,
    email: string,
    phoneNumber: string,
    password: string
}

export interface LoginModal {
    id?: string
    email: string,
    password: string
}

export interface UpdatUserModal {
    name: string,
    phoneNumber: string,
}