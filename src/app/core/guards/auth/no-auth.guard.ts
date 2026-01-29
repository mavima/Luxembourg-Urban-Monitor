import { inject } from "@angular/core";
import { Router, CanActivateFn } from "@angular/router";
import { GLOBAL_ROUTES } from "src/config/routes";
import { AuthService } from "../../services/auth/auth.service";

export const noAuthGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const routes = GLOBAL_ROUTES;

    if (!authService.isAuthenticated) {
        return true;
    }

    // Redirect to home if already authenticated
    router.navigate([routes.home]);
    return false;
};
