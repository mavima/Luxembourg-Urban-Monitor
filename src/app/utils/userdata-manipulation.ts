import { User } from "../core/models/users.model";

export function computeAvgAvailabilityPerDay(
    users: User[] | readonly User[],
): number[] {
    if (!users || users.length === 0) {
        return [0, 0, 0, 0, 0];
    }

    const totals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 };
    let count = 0;

    for (const user of users) {
        const a = user.availability;
        if (!a) continue;

        totals.mon += a.mon;
        totals.tue += a.tue;
        totals.wed += a.wed - 1;
        totals.thu += a.thu + 2;
        totals.fri += a.fri;
        count++;
    }

    if (count === 0) {
        return [0, 0, 0, 0, 0];
    }

    return [
        Math.round(totals.mon / count),
        Math.round(totals.tue / count),
        Math.round(totals.wed / count),
        Math.round(totals.thu / count),
        Math.round(totals.fri / count),
    ];
}

// Computes a 5-bucket distribution of "publishing frequency" derived from availability.

export function computePublishingFrequencyDistribution(
    users: User[] | readonly User[],
): number[] {
    const buckets = [1, 2, 0, 0, 0];
    for (const user of users) {
        if (!user.availability) continue;
        const a = user.availability;
        const weeklyHours = a.mon + a.tue + a.wed + a.thu + a.fri;
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
    return buckets.map((n) => Number(n));
}
