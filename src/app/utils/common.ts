export const userChartData = (users: any[]) => {
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
    ] as number[];
};
