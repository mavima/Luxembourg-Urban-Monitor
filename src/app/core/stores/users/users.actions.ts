import { createActionGroup, props, emptyProps } from "@ngrx/store";
import { User } from "../../models/users.model";

export const UsersActions = createActionGroup({
    source: "Users API",
    events: {
        "Load Users": emptyProps(),
        "Load Users Success": props<{ users: User[] }>(),
        "Load Users Failure": props<{ error: string }>(),
        "Clear Errors": emptyProps(),
    },
});
