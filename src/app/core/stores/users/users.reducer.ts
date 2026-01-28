import { UsersState } from "./users.state";
import {
    LoadUsersAction,
    LoadUsersSuccessAction,
    LoadUsersFailureAction,
} from "./users.actions";

export const usersReducer = {
    loadUsers: (state: UsersState, _action?: LoadUsersAction): UsersState => ({
        ...state,
        loading: true,
    }),

    loadUsersSuccess: (
        state: UsersState,
        action: LoadUsersSuccessAction,
    ): UsersState => ({
        ...state,
        users: action.users,
        loading: false,
    }),

    loadUsersFailure: (
        state: UsersState,
        _action?: LoadUsersFailureAction,
    ): UsersState => ({
        ...state,
        loading: false,
    }),
};
