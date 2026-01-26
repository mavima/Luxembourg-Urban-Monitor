import { inject } from "@angular/core";
import { Router, CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { GLOBAL_ROUTES } from "src/config/routes";

export const authGuard: CanActivateFn = (route, state) => {
    const routes = GLOBAL_ROUTES;
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated) {
        return true;
    }

    // Redirect to login page
    router.navigate([routes.login], { queryParams: { returnUrl: state.url } });
    return false;
};
