import { enableProdMode } from "@angular/core";
import { preInitApp } from "@eui/core";
import { environment } from "./environments/environment";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";

if (environment.production) {
    enableProdMode();
}

preInitApp({
    configUrl: "assets/env-json-config.json",
}).then(() =>
    bootstrapApplication(AppComponent, appConfig).catch(console.error),
);

declare global {
    interface Window {
        global: Window;
    }
}
window.global = window;
