import { Routes } from "@angular/router";

export const routes: Routes = [
    // Set default route to auth/login
    { path: "", redirectTo: "auth/login", pathMatch: "full" },
    { path: "index.jsp", redirectTo: "auth/login" },

    {
        path: "home",
        loadChildren: () =>
            import("./features/home/home.routes").then((m) => m.HOME_ROUTES),
    },

    {
        path: "auth/login",
        loadChildren: () =>
            import("./features/auth/login/login.routes").then(
                (m) => m.AUTH_LOGIN_ROUTES,
            ),
    },
    {
        path: "auth/signup",
        loadChildren: () =>
            import("./features/auth/signup/signup.routes").then(
                (m) => m.AUTH_SIGNUP_ROUTES,
            ),
    },
    {
        path: "users",
        loadChildren: () =>
            import("./features/users/users.routes").then((m) => m.USERS_ROUTES),
    },
    {
        path: "maps",
        loadChildren: () =>
            import("./features/map/geoportail-map/maps.routes").then(
                (m) => m.MAPS_ROUTES,
            ),
    },
];
