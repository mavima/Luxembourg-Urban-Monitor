// src/app/core/stores/auth/auth.effects.ts
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth/auth.service";
import { AuthActions } from "./auth.actions";
import { catchError, map, exhaustMap, of, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginRequested),
            exhaustMap(({ credentials }) =>
                // Using your existing mockLogin method
                this.authService.mockLogin(credentials).pipe(
                    map((res) =>
                        AuthActions.loginSuccess({
                            user: res.user,
                            token: res.token,
                        }),
                    ),
                    catchError((err) =>
                        of(AuthActions.loginFailure({ error: err.message })),
                    ),
                ),
            ),
        ),
    );

    // Success : Navigate to home
    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(() => this.router.navigate(["/home"])),
            ),
        { dispatch: false },
    );

    // Logout: Navigate to login
    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logout),
                tap(() => {
                    // Clear your AuthService/LocalStorage
                    this.authService.logout();

                    // Redirect to login
                    this.router.navigate(["/auth/login"]);
                }),
            ),
        { dispatch: false }, // We don't dispatch a new action after this
    );
}
