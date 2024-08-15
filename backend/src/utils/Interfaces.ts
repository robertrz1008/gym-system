import { NextFunction, Request } from "express";

export interface User {
    id?: number,
    name?: string, //opcional
    email: string,
    password: string,
    parse: (req: any) => void
}
export interface CustomRequest extends Request {
    user?: any; 
} 

export interface httpRuote {
    req: Request,
    res: Response,
    next: NextFunction
}

export interface ClientFilter{
    memberships: boolean
    orderByName: number
}

export interface ProductParams{
    isStock: boolean
    categoryId: number | null,
    fromPrice: number,
    toPrice: number,
    orderBy:  number,
    order: number
}