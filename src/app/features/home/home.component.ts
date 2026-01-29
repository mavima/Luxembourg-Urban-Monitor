import { Component, inject } from "@angular/core";
import { CONFIG_TOKEN, EuiAppConfig } from "@eui/core";
import { EUI_PAGE } from "@eui/components/eui-page";
import { EUI_BUTTON } from "@eui/components/eui-button"; // Added for buttons
import { TranslateModule } from "@ngx-translate/core";
import { RouterLink } from "@angular/router"; // Added for navigation
import { GeoportailMapComponent } from "../map/geoportail-map/geoportail-map.component";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    standalone: true,
    imports: [
        TranslateModule,
        ...EUI_PAGE,
        ...EUI_BUTTON,
        RouterLink,
        GeoportailMapComponent,
    ],
})
export class HomeComponent {
    protected config: EuiAppConfig = inject(CONFIG_TOKEN);
}
