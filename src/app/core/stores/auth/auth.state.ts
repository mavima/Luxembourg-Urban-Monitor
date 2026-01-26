export interface AuthState {
    user: any | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

export const initialAuthState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
};
