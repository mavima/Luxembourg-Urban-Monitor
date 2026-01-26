import { inject, Injectable, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin } from "rxjs";

export interface Post {
    userId: number;
    id: number;
    title: string;
}

export interface WeeklyAvailability {
    mon: number;
    tue: number;
    wed: number;
    thu: number;
    fri: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    postCount?: number;
    availability?: WeeklyAvailability;
}

@Injectable({ providedIn: "root" })
export class UsersStore {
    private http = inject(HttpClient);

    private readonly _users = signal<User[]>([]);
    private readonly _loading = signal(false);

    readonly users = this._users.asReadonly();
    readonly loading = this._loading.asReadonly();

    readonly totalUsers = computed(() => this._users().length);
    readonly userNames = computed(() => this._users().map((u) => u.name));
    readonly postCounts = computed(() =>
        this._users().map((u) => u.postCount ?? 0),
    );

    loadUsers(): void {
        if (this._users().length) {
            return;
        }

        this._loading.set(true);
        forkJoin({
            users: this.http.get<User[]>(
                "https://jsonplaceholder.typicode.com/users",
            ),
            posts: this.http.get<Post[]>(
                "https://jsonplaceholder.typicode.com/posts",
            ),
        }).subscribe({
            next: ({ users, posts }) => {
                const usersWithData = users.map((user) => {
                    // 1️⃣ Only posts with long titles
                    const validPosts = posts.filter(
                        (p) => p.userId === user.id && p.title.length > 40,
                    );

                    // 2️⃣ Take longest ones for availability (max 5)
                    const availabilityPosts = [...validPosts]
                        .sort((a, b) => b.title.length - a.title.length)
                        .slice(0, 5);

                    // 3️⃣ Convert title length → hours
                    const hours = availabilityPosts.map((p) =>
                        Math.min(
                            8,
                            Math.max(1, Math.ceil(p.title.length / 10)),
                        ),
                    );

                    const availability: WeeklyAvailability = {
                        mon: hours[0] ?? 0,
                        tue: hours[1] ?? 0,
                        wed: hours[2] ?? 0,
                        thu: hours[3] ?? 0,
                        fri: hours[4] ?? 0,
                    };

                    return {
                        ...user,
                        postCount: validPosts.length, // 👈 NOW VARIABLE
                        availability,
                    };
                });

                this._users.set(usersWithData);
                this._loading.set(false);
            },
            error: (err) => {
                console.error(err);
                this._loading.set(false);
            },
        });
    }

    readonly avgAvailabilityPerDay = computed(() => {
        const users = this._users();

        if (!users.length) {
            return [0, 0, 0, 0, 0];
        }

        const totals = {
            mon: 0,
            tue: 0,
            wed: 0,
            thu: 0,
            fri: 0,
        };

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
    });

    readonly publishingFrequencyDistribution = computed(() => {
        const users = this._users();
        const buckets = [1, 2, 0, 0, 0];

        for (const user of users) {
            if (!user.availability) continue;

            // Use availability as proxy for activity
            const weeklyHours =
                user.availability.mon +
                user.availability.tue +
                user.availability.wed +
                user.availability.thu +
                user.availability.fri;

            // Convert weekly hours → "posts per month" (simulated)
            const postsPerMonth = Math.round(weeklyHours / 6);

            // Duplicate users to enrich data
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
    });

    // readonly publishingFrequencyDistribution = computed(() => {
    //     const users = this._users();
    //     const buckets = [0, 0, 0, 0, 0];

    //     for (const user of users) {
    //         const base = user.postCount ?? 0;

    //         const simulated = [base, base + 1, Math.max(0, base - 1)];

    //         for (const count of simulated) {
    //             if (count === 0) buckets[0]++;
    //             else if (count === 1) buckets[1]++;
    //             else if (count <= 3) buckets[2]++;
    //             else if (count <= 6) buckets[3]++;
    //             else buckets[4]++;
    //         }
    //     }

    //     return buckets;
    // });
}
