import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map } from "rxjs";
import { User, Post, WeeklyAvailability } from "../../core/models/users.model";

@Injectable({
    providedIn: "root",
})
export class UsersService {
    private http = inject(HttpClient);

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(
            "https://jsonplaceholder.typicode.com/users",
        );
    }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(
            "https://jsonplaceholder.typicode.com/posts",
        );
    }

    getEnrichedUsers(): Observable<User[]> {
        return forkJoin({
            users: this.getUsers(),
            posts: this.getPosts(),
        }).pipe(
            map(({ users, posts }) =>
                users.map((user) => {
                    const validPosts = posts.filter(
                        (p) => p.userId === user.id && p.title.length > 40,
                    );

                    const availabilityPosts = [...validPosts]
                        .sort((a, b) => b.title.length - a.title.length)
                        .slice(0, 5);

                    const hours = availabilityPosts.map((p) =>
                        Math.min(
                            8,
                            Math.max(1, Math.ceil(p.title.length / 10)),
                        ),
                    );

                    const totalHours = hours.reduce((sum, h) => sum + h, 0);

                    const availability: WeeklyAvailability = {
                        mon: hours[0] ?? 0,
                        tue: hours[1] ?? 0,
                        wed: hours[2] ?? 0,
                        thu: hours[3] ?? 0,
                        fri: hours[4] ?? 0,
                    };

                    return {
                        ...user,
                        postCount: validPosts.length,
                        availability,
                        location: this.deriveLocationFromActivity(
                            validPosts.length,
                            totalHours,
                            user.id,
                        ),
                    };
                }),
            ),
        );
    }

    getUsersWithPostCount(): Observable<User[]> {
        return forkJoin({
            users: this.getUsers(),
            posts: this.getPosts(),
        }).pipe(
            map(({ users, posts }) =>
                users.map((user) => ({
                    ...user,
                    postCount: posts.filter((post) => post.userId === user.id)
                        .length,
                })),
            ),
        );
    }

    deriveLocationFromActivity(
        postCount: number,
        totalHours: number,
        userId: number,
    ): string {
        const bias = userId % 5;

        const score = postCount * 2 + totalHours + bias * 3;

        if (score > 44) return "Brussels";
        if (score > 39) return "Luxembourg";
        if (score > 31) return "Strasbourg";
        if (score > 23) return "Dublin";
        return "Milan";
    }
}
