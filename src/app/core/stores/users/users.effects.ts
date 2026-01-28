import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersActions } from "./users.actions";
import { UsersService } from "../../services/users.service";
import { catchError, map, switchMap, of } from "rxjs";

@Injectable()
export class UsersEffects {
    private actions$ = inject(Actions);
    private usersService = inject(UsersService);

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loadUsers),
            switchMap(() =>
                this.usersService.getEnrichedUsers().pipe(
                    map((users) => UsersActions.loadUsersSuccess({ users })),
                    catchError((err) =>
                        of(
                            UsersActions.loadUsersFailure({
                                error: (err?.message ??
                                    "Failed to load users") as string,
                            }),
                        ),
                    ),
                ),
            ),
        ),
    );
}
