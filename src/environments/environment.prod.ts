import { EuiEnvConfig } from "@eui/core";

export const environment: EuiEnvConfig = {
    production: true,
    enableDevToolRedux: false,
    envDynamicConfig: {
        uri: "assets/env-json-config.json",
        deepMerge: true,
        merge: ["modules"],
    },
    auth0: {
        domain: "https://dev-jirv4onihmie7k70.eu.auth0.com/api/v2/",
        clientId: "K18Hqq2ADFBlX29HM9KwacHAlrJnmtdH",
        clientSecret:
            "hQreM2JRJA2rZWunpVWLy7mG3AO6GirJvdVA85p-CE8cVzQDRR0wf03vGqYGEbkr",
        endPoint: "https://dev-jirv4onihmie7k70.eu.auth0.com/api/v2/",
    },
};
