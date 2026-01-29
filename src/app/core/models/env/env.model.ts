import { EuiEnvConfig } from "@eui/core";

interface Auth0Environment {
    domain: string;
    clientId: string;
    clientSecret: string;
    endPoint: string;
}

export interface EnvConfig extends EuiEnvConfig {
    production: boolean;
    auth0: Auth0Environment;
}
