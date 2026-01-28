import { User } from "../../models/users.model";

export const LOAD_USERS = "[Users] Load Users";
export const LOAD_USERS_SUCCESS = "[Users] Load Users Success";
export const LOAD_USERS_FAILURE = "[Users] Load Users Failure";

export interface LoadUsersAction {
    type: typeof LOAD_USERS;
}

export interface LoadUsersSuccessAction {
    type: typeof LOAD_USERS_SUCCESS;
    users: User[];
}

export interface LoadUsersFailureAction {
    type: typeof LOAD_USERS_FAILURE;
    error?: unknown;
}

export type UsersActions =
    | LoadUsersAction
    | LoadUsersSuccessAction
    | LoadUsersFailureAction;

// Factory helpers
export const loadUsers = (): LoadUsersAction => ({ type: LOAD_USERS });
export const loadUsersSuccess = (users: User[]): LoadUsersSuccessAction => ({
    type: LOAD_USERS_SUCCESS,
    users,
});
export const loadUsersFailure = (error?: unknown): LoadUsersFailureAction => ({
    type: LOAD_USERS_FAILURE,
    error,
});
