import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService as Auth0Service } from "@auth0/auth0-angular";
import { map, take } from "rxjs/operators";
import { GLOBAL_ROUTES } from "src/config/routes";

export const authGuard: CanActivateFn = (route, state) => {
    const auth0 = inject(Auth0Service);
    const router = inject(Router);
    const routes = GLOBAL_ROUTES;

    return auth0.isAuthenticated$.pipe(
        take(1),
        map((isAuthenticated) => {
            if (isAuthenticated) {
                return true;
            }

            return router.createUrlTree([routes.login], {
                queryParams: { returnUrl: state.url },
            });
        }),
    );
};
