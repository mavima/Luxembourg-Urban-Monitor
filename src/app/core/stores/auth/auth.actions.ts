import { createActionGroup, props, emptyProps } from "@ngrx/store";
const AUTH_EVENTS = {
    LOGIN_REQUESTED : 'Login Requested'
}
export const AuthActions = createActionGroup({
    source: "Urban Auth API",
    events: {
        "Login Requested": props<{
            credentials: { username: string; password: string };
        }>(),
        "Login Success": props<{ user: any; token: string }>(),
        "Login Failure": props<{ error: string }>(),
        "Clear Errors": emptyProps(),
        Logout: emptyProps(),
    },
});
P