import { Component, OnInit, inject } from "@angular/core";
import { UsersService, User } from "../../core/services/users.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-users",
    imports: [CommonModule],
    templateUrl: "./users.html",
    styleUrl: "./users.scss",
})
export class Users implements OnInit {
    users: User[] = [];
    loading = true;

    private readonly usersService = inject(UsersService);

    ngOnInit(): void {
        this.usersService.getUsers().subscribe({
            next: (users) => {
                this.users = users;
                this.loading = false;
            },
            error: (err) => {
                console.error("Failed to load users", err);
                this.loading = false;
            },
        });
    }
}
