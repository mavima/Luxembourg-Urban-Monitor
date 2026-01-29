import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import {
    LoginRequest,
    SignupRequest,
    AuthResponse,
    User,
} from "../models/auth/auth.model";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private apiUrl = "http://localhost:3000/api/auth";
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser$: Observable<User | null>;
    private tokenKey = "auth_token";
    private userKey = "current_user";

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        // Initialize with stored user data
        const storedUser = this.getStoredUser();
        this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    /**
     * Get current user value
     */
    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    /**
     * Check if user is authenticated
     */
    public get isAuthenticated(): boolean {
        return !!this.getToken() && !!this.currentUserValue;
    }

    /**
     * Login user
     */
    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${this.apiUrl}/login`, credentials)
            .pipe(
                tap((response) => {
                    if (response.token && response.user) {
                        this.setSession(response);
                    }
                }),
                catchError(this.handleError),
            );
    }

    /**
     * Sign up new user
     */
    signup(data: SignupRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, data).pipe(
            tap((response) => {
                // Optionally auto-login after signup
                // this.setSession(response);
            }),
            catchError(this.handleError),
        );
    }

    /**
     * Logout user
     */
    logout(): void {
        // Clear local storage
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);

        // Update current user
        this.currentUserSubject.next(null);

        // Navigate to login
        this.router.navigate(["/auth/login"]);
    }

    /**
     * Get stored token
     */
    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Set authentication session
     */
    private setSession(authResponse: AuthResponse): void {
        localStorage.setItem(this.tokenKey, authResponse.token);
        localStorage.setItem(this.userKey, JSON.stringify(authResponse.user));
        this.currentUserSubject.next(authResponse.user);
    }

    /**
     * Get stored user from localStorage
     */
    private getStoredUser(): User | null {
        const userJson = localStorage.getItem(this.userKey);
        if (userJson) {
            try {
                return JSON.parse(userJson);
            } catch (e) {
                console.error("Error parsing stored user:", e);
                return null;
            }
        }
        return null;
    }

    /**
     * Refresh token (if your API supports it)
     */
    refreshToken(): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, {}).pipe(
            tap((response) => {
                if (response.token) {
                    localStorage.setItem(this.tokenKey, response.token);
                }
            }),
            catchError(this.handleError),
        );
    }

    /**
     * Handle HTTP errors
     */
    private handleError(error: any): Observable<never> {
        let errorMessage = "An error occurred";

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage =
                error.error?.message ||
                `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }

    /**
     * Mock login for development (remove in production)
     */
    mockLogin(credentials: LoginRequest): Observable<AuthResponse> {
        // Simulate API delay
        return of({
            user: {
                id: "1",
                username: credentials.username,
                email: `${credentials.username}@example.com`,
            },
            token: "mock-jwt-token-" + Date.now(),
            message: "Login successful",
        }).pipe(tap((response) => this.setSession(response)));
    }

    /**
     * Mock signup for development (remove in production)
     */
    mockSignup(data: SignupRequest): Observable<AuthResponse> {
        return of({
            user: {
                id: Date.now().toString(),
                username: data.username,
                email: data.email,
            },
            token: "mock-jwt-token-" + Date.now(),
            message: "Signup successful",
        });
    }
}
