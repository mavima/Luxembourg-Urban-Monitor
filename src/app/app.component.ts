import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
} from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import { EUI_LANGUAGE_SELECTOR } from "@eui/components/eui-language-selector";
import { EUI_USER_PROFILE } from "@eui/components/eui-user-profile";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LAYOUT } from "@eui/components/layout";
import { EuiMenuItem } from "@eui/components/eui-menu";
import { Store } from "@ngrx/store";
import { AuthActions } from "./core/stores/auth/auth.actions";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    imports: [
        CommonModule,
        TranslateModule,
        ...EUI_LAYOUT,
        ...EUI_ICON,
        ...EUI_USER_PROFILE,
        ...EUI_LANGUAGE_SELECTOR,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    private readonly store = inject(Store);
    private readonly router = inject(Router);
    private readonly cdr = inject(ChangeDetectorRef);

    sidebarItems: EuiMenuItem[] = [
        {
            label: "Home",
            url: "home",
        },
        { label: "Urban Maps", url: "maps" },
        { label: "User Directory", url: "users" },
        { label: "Products", url: "products" },
    ];

    notificationItems = [
        { label: "Title label 1", subLabel: "Subtitle label" },
        { label: "Title label 2", subLabel: "Subtitle label" },
    ];

    isAuthRoute = false;

    constructor() {
        // Defer initial route evaluation to avoid NG0100 error
        queueMicrotask(() => {
            this.updateRoute(this.router.url);
        });

        this.router.events
            .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
            .subscribe((event) => {
                this.updateRoute(event.urlAfterRedirects);
            });
    }

    onLogout() {
        this.store.dispatch(AuthActions.logout());
    }

    private updateRoute(url: string): void {
        this.isAuthRoute = url.includes("/auth/");
        this.cdr.markForCheck();
    }
}
