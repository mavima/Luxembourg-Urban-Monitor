import { Component, inject } from "@angular/core";
import { CONFIG_TOKEN, EuiAppConfig } from "@eui/core";
import { EUI_PAGE } from "@eui/components/eui-page";
import { TranslateModule } from "@ngx-translate/core";
import { GeoportailMapComponent } from "../map/geoportail-map/geoportail-map";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    imports: [TranslateModule, ...EUI_PAGE, GeoportailMapComponent],
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
    protected config: EuiAppConfig = inject(CONFIG_TOKEN);
}
