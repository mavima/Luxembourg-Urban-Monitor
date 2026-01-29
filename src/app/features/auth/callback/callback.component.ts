import { Component, inject } from "@angular/core";
import { SHARED_UI_MODULES } from "src/app/shared-modules";
import { Store } from "@ngrx/store";
import { AuthActions } from "src/app/core/stores/auth/auth.actions";

@Component({
    selector: "app-callback",
    templateUrl: "./callback.component.html",
    imports: [SHARED_UI_MODULES],
})
export class AuthCallbackComponent {
    private store = inject(Store);

    constructor() {
        this.store.dispatch(AuthActions.handleAuthCallback());
    }
}
