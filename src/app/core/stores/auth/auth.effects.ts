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

    // Start Auth0 login
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginRequested),
            exhaustMap(() =>
                this.authService.login().pipe(
                    // Auth0 will redirect → effect completes
                    map(() => ({ type: "[Auth] Redirected" })),
                ),
            ),
        ),
    );

    // Handle redirect after Auth0 login
    handleCallback$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.handleAuthCallback),
            exhaustMap(() =>
                this.authService.handleRedirect().pipe(
                    map(({ user, token }) =>
                        AuthActions.loginSuccess({ user, token }),
                    ),
                    catchError((err) =>
                        of(AuthActions.loginFailure({ error: err.message })),
                    ),
                ),
            ),
        ),
    );

    // Navigate on success
    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(() => this.router.navigate(["/home"])),
            ),
        { dispatch: false },
    );

    // Logout
    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logout),
                tap(() => this.authService.logout()),
            ),
        { dispatch: false },
    );
}
