import { Action } from "@ngrx/store";
import { IUser } from "src/app/models/user";

export const GET_USER = '[User] Get user';
export const GET_USER_SUCCESS = '[User] Get user success';
export const GET_USER_FAIL = '[User] Get user fail';

export const LOGIN = '[User] Login';
export const LOGIN_SUCCESS = '[User] Login success';
export const LOGIN_FAIL = '[User] Logout fail';


export const LOGOUT = '[User] Logout';

export class GetUser implements Action {
    readonly type = GET_USER;
}

export class GetUserSuccess implements Action {
    readonly type = GET_USER_SUCCESS;
    constructor(public payload: IUser){};
}

export class GetUserFail implements Action {
    readonly type = GET_USER_FAIL;
    constructor(public payload: any){};
}

export class Login implements Action{
    readonly type = LOGIN;
    constructor(public payload: any){};
}

export class LoginSuccess implements Action{
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: IUser){};
}

export class LoginFail implements Action{
    readonly type = LOGIN_FAIL;
    constructor(public payload: any){};
}

export class Logout implements Action{
    readonly type = LOGOUT;
}

export type Actions = GetUser | GetUserSuccess | GetUserFail | Login | LoginSuccess | LoginFail | Logout;