import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService as Auth0Service } from "@auth0/auth0-angular";
import { from, switchMap } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth0 = inject(Auth0Service);
    //TODO: Improve interceptors
    return next(req);
    // Skip public endpoints
    if (req.url.includes("/auth/")) {
        // return next(req);
    }

    return auth0.getAccessTokenSilently().pipe(
        switchMap((token) =>
            next(
                req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
            ),
        ),
    );
};
