import { enableProdMode, mergeApplicationConfig } from "@angular/core";
import { preInitApp } from "@eui/core";
import { environment } from "./environments/environment";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";
import { provideAuth0 } from "@auth0/auth0-angular";

if (environment.production) {
    enableProdMode();
}

const auth0Config = mergeApplicationConfig(appConfig, {
    providers: [
        provideAuth0({
            domain: environment.auth0.domain,
            clientId: environment.auth0.clientId,
            authorizationParams: {
                redirect_uri: window.location.origin,
            },
        }),
    ],
});

preInitApp({
    configUrl: "assets/env-json-config.json",
}).then(() =>
    bootstrapApplication(AppComponent, auth0Config).catch(console.error),
);

declare global {
    interface Window {
        global: Window;
    }
}
window.global = window;
