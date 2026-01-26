import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map } from "rxjs";

export interface User {
    id: number;
    name: string;
    username?: string;
    email: string;
    posts: Post[];
    postCount?: number;
}

interface Post {
    id: number;
    userId: number;
}

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

    private getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(
            "https://jsonplaceholder.typicode.com/posts",
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
}
