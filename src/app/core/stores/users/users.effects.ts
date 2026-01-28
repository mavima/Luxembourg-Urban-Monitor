import { inject, Injectable } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { loadUsersSuccess, loadUsersFailure } from "./users.actions";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class UsersEffects {
    private usersService = inject(UsersService);

    loadUsersEffect() {
        return this.usersService.getEnrichedUsers().pipe(
            map((users) => loadUsersSuccess(users)),
            catchError(() => of(loadUsersFailure())),
        );
    }
}
