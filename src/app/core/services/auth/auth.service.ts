// src/app/core/services/auth/auth.service.ts
import { Injectable } from "@angular/core";
import { AuthService as Auth0Service } from "@auth0/auth0-angular";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthService {
    constructor(private auth0: Auth0Service) {}

    login(): Observable<void> {
        return from(this.auth0.loginWithRedirect());
    }

    handleRedirect(): Observable<{ user: any; token: string }> {
        return this.auth0.idTokenClaims$.pipe(
            map((claims: any) => {
                if (!claims) {
                    throw new Error("No ID token claims available");
                }

                return {
                    token: claims.__raw,
                    user: {
                        id: claims.sub,
                        email: claims.email,
                        name: claims.name,
                    },
                };
            }),
        );
    }

    logout(): void {
        this.auth0.logout({
            logoutParams: { returnTo: window.location.origin },
        });
    }
}
