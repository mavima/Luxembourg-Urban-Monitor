import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

// 1. Grab the entire Auth slice of the store
export const selectAuthState = createFeatureSelector<AuthState>("auth");

// 2. Select the 'user' object
export const selectUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.user,
);

// 3. Select the 'token'
export const selectToken = createSelector(
    selectAuthState,
    (state: AuthState) => state.token,
);

// 4. Derived Selector: Check if logged in based on token existence
export const selectIsLoggedIn = createSelector(selectToken, (token) => !!token);

// 5. Select the loading status (for spinners)
export const selectAuthLoading = createSelector(
    selectAuthState,
    (state: AuthState) => state.isLoading,
);

// 6. Select the error message
export const selectAuthError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error,
);
