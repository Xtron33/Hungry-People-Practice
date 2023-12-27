export interface IUser {
    id?: number
    email: string
    role: string
}

export interface IUserData{
    email: string
    password: string
}

export interface IUserReg{
    email: string,
    password: string,
    role: string
}