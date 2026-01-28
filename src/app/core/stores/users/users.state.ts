import { User } from "../../models/users.model";

export interface UsersState {
    users: User[];
    loading: boolean;
}

export const initialUsersState: UsersState = {
    users: [],
    loading: false,
};
