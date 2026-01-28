import { Injectable, signal } from "@angular/core";
import { initialUsersState } from "./users.state";
import { usersReducer } from "./users.reducer";
import { LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE } from "./users.actions";
import { UsersEffects } from "./users.effects";
import * as selectors from "./users.selectors";

@Injectable({ providedIn: "root" })
export class UsersStore {
    private state = signal(initialUsersState);
    private effects = new UsersEffects();

    users = selectors.selectUsers(this.state);
    loading = selectors.selectLoading(this.state);
    totalUsers = selectors.selectTotalUsers(this.state);
    userNames = selectors.selectUserNames(this.state);
    postCounts = selectors.selectPostCounts(this.state);
    avgAvailabilityPerDay = selectors.selectAvgAvailability(this.state);
    publishingFrequencyDistribution = selectors.selectPublishingFrequency(
        this.state,
    );
    usersPerLocation = selectors.selectUsersPerLocation(this.state);

    loadUsers() {
        this.state.set(usersReducer.loadUsers(this.state()));

        this.effects.loadUsersEffect().subscribe((action) => {
            switch (action.type) {
                case LOAD_USERS_SUCCESS: {
                    const next = usersReducer.loadUsersSuccess(
                        this.state(),
                        action,
                    );
                    this.state.set(next);
                    break;
                }

                case LOAD_USERS_FAILURE: {
                    const next = usersReducer.loadUsersFailure(
                        this.state(),
                        action,
                    );
                    this.state.set(next);
                    break;
                }
            }
        });
    }
}
