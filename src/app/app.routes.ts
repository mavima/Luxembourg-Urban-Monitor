import { Routes } from "@angular/router";
<<<<<<< HEAD
=======
import { Users } from "./features/users/users";
>>>>>>> f43bb7c (created user and route)

export const routes: Routes = [
    { path: "", redirectTo: "screen/home", pathMatch: "full" },
    { path: "index.jsp", redirectTo: "screen/home" },
    {
        path: "screen/home",
        loadChildren: () =>
            import("./features/home/home.routes").then((m) => m.HOME_ROUTES),
    },
    {
        path: "screen/module1",
        loadChildren: () =>
            import("./features/module1/module1.routes").then(
                (m) => m.MODULE1_ROUTES,
            ),
    },
    {
        path: "screen/module2",
        loadChildren: () =>
            import("./features/module2/module2.routes").then(
                (m) => m.MODULE2_ROUTES,
            ),
    },
    {
        path: "screen/auth/login",
        loadChildren: () =>
            import("./features/auth/login/login.routes").then(
                (m) => m.AUTH_LOGIN_ROUTES,
            ),
    },
    {
        path: "screen/auth/signup",
        loadChildren: () =>
            import("./features/auth/signup/signup.routes").then(
                (m) => m.AUTH_SIGNUP_ROUTES,
            ),
        path: "screen/users",
        loadChildren: () =>
            import("./features/users/users.routes").then((m) => m.USERS_ROUTES),
    },
];
