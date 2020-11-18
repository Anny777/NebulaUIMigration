import { Injectable } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Effect, Actions } from "@ngrx/effects";
import * as UserActions from "../actions/user.Actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class userEffects {
    constructor(private actions$: Actions, private authService: AuthService) { }
    @Effect()
    user$ = this.actions$.ofType(UserActions.GET_USER)
        .pipe(
            switchMap(c => this.authService.getUserInfo({})
                .pipe(
                    map(userInfo => new UserActions.GetUserSuccess(userInfo)),
                    catchError(error => of(new UserActions.GetUserFail(error)))
                )
            ));

    @Effect()
    login$ = this.actions$.ofType<UserActions.Login>(UserActions.LOGIN)
        .pipe(
            switchMap(c => this.authService.login(c.payload.email, c.payload.pass)
                .pipe(
                    map(user => new UserActions.LoginSuccess(user)),
                    catchError(error => of(new UserActions.LoginFail(error)))
                )
            ));
}
