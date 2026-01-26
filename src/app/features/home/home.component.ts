import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CONFIG_TOKEN, EuiAppConfig } from "@eui/core";
import { EUI_PAGE } from "@eui/components/eui-page";
import { EUI_AVATAR } from "@eui/components/eui-avatar";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LIST } from "@eui/components/eui-list";
import { UsersStore } from "../../core/stores/users.store";
import { TranslateModule } from "@ngx-translate/core";
import { GeoportailMapComponent } from "../map/geoportail-map/geoportail-map";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    imports: [
        CommonModule,
        TranslateModule,
        ...EUI_PAGE,
        ...EUI_AVATAR,
        ...EUI_ICON,
        ...EUI_LIST,
        GeoportailMapComponent,
    ],
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    private store = inject(UsersStore);
    protected config: EuiAppConfig = inject(CONFIG_TOKEN);

    users = this.store.users;
    loading = this.store.loading;

    ngOnInit(): void {
        this.store.loadUsers();
    }
}
