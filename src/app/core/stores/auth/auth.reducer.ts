import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "./auth.actions";
import { initialAuthState } from "./auth.state";

export const authReducer = createReducer(
    initialAuthState,
    on(AuthActions.loginRequested, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),
    on(AuthActions.loginSuccess, (state, { user, token }) => ({
        ...state,
        user,
        token,
        isLoading: false,
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false,
    })),
    on(AuthActions.logout, (state) => ({
        ...initialAuthState,
    })),
);
