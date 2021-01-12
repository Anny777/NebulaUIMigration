import * as UserActions from '../actions/user.Actions'
import { IUser } from 'src/app/models/user';

export interface IUserState {
    user: IUser,
    isLoadingGetUser: boolean,
    isLoadingLogin: boolean,
    logout: boolean
}

const initialState: IUserState = {
    user: {
        Email: '',
        HasRegistered: false,
        roles: ['']
    },
    isLoadingGetUser: false,
    isLoadingLogin: false,
    logout: false
};

export function userReducer(state: IUserState = initialState, action: UserActions.Actions): IUserState {

    switch (action.type) {
        case UserActions.GET_USER:
            return { ...state, isLoadingGetUser: true };
        case UserActions.GET_USER_SUCCESS:
            return { ...state, user: action.payload, isLoadingGetUser: false };
        case UserActions.GET_USER_FAIL:
            return { ...state, isLoadingGetUser: true };
        case UserActions.LOGIN:
            return { ...state, isLoadingLogin: false };
        case UserActions.LOGIN_SUCCESS:
            return { ...state, user: action.payload, isLoadingLogin: false };
        case UserActions.LOGIN_FAIL:
            return { ...state, isLoadingLogin: true };
        case UserActions.LOGOUT:
            return { ...state, logout: true };
        default:
            return state;
    }

}
