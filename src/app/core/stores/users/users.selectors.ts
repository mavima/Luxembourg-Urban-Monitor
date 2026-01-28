import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "./users.state";

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

// Your complex derived selectors, ported 1:1:
export const selectAvgAvailabilityPerDay = createSelector(
    selectUsers,
    (users) => {
        if (!users.length) return [0, 0, 0, 0, 0];

        const totals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 };
        let count = 0;

        for (const user of users) {
            if (!user.availability) continue;
            totals.mon += user.availability.mon;
            totals.tue += user.availability.tue;
            totals.wed += user.availability.wed - 1;
            totals.thu += user.availability.thu + 2;
            totals.fri += user.availability.fri;
            count++;
        }

        if (!count) return [0, 0, 0, 0, 0];

        return [
            Math.round(totals.mon / count),
            Math.round(totals.tue / count),
            Math.round(totals.wed / count),
            Math.round(totals.thu / count),
            Math.round(totals.fri / count),
        ];
    },
);

export const selectPublishingFrequencyDistribution = createSelector(
    selectUsers,
    (users) => {
        const buckets = [1, 2, 0, 0, 0];
        for (const user of users) {
            if (!user.availability) continue;

            const weeklyHours =
                user.availability.mon +
                user.availability.tue +
                user.availability.wed +
                user.availability.thu +
                user.availability.fri;

            const postsPerMonth = Math.round(weeklyHours / 6);
            const simulated = [
                postsPerMonth,
                postsPerMonth + 1,
                Math.max(0, postsPerMonth - 1),
            ];

            for (const value of simulated) {
                if (value === 0) buckets[0]++;
                else if (value === 1) buckets[1]++;
                else if (value <= 3) buckets[2]++;
                else if (value <= 5) buckets[3]++;
                else buckets[4]++;
            }
        }
        return buckets;
    },
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
