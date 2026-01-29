import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "./users.state";
import {
    computeAvgAvailabilityPerDay,
    computePublishingFrequencyDistribution,
} from "src/app/utils/userdata-manipulation";

export const USERS_FEATURE_KEY = "users";

export const selectUsersState =
    createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsers = createSelector(selectUsersState, (s) => s.users);
export const selectLoading = createSelector(selectUsersState, (s) => s.loading);
export const selectError = createSelector(selectUsersState, (s) => s.error);

export const selectTotalUsers = createSelector(
    selectUsers,
    (users) => users.length,
);

export const selectUserNames = createSelector(selectUsers, (users) =>
    users.map((u) => u.name),
);

export const selectPostCounts = createSelector(selectUsers, (users) =>
    users.map((u) => u.postCount ?? 0),
);

export const selectAvgAvailabilityPerDay = createSelector(
    selectUsers,
    (users) => computeAvgAvailabilityPerDay(users),
);

export const selectPublishingFrequencyDistribution = createSelector(
    selectUsers,
    computePublishingFrequencyDistribution,
);

export const selectUsersPerLocation = createSelector(selectUsers, (users) => {
    const counts = new Map<string, number>();
    for (const u of users) {
        counts.set(u.location, (counts.get(u.location) ?? 0) + 1);
    }
    return {
        labels: [...counts.keys()],
        series: [...counts.values()],
    };
});
