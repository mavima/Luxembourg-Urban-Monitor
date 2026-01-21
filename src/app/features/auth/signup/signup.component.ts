import { Component, inject } from "@angular/core";
import { CONFIG_TOKEN, EuiAppConfig } from "@eui/core";
import { SHARED_UI_MODULES } from "src/app/shared-modules";
import {
    FormControl,
    FormGroup,
    Validators,
    AbstractControl,
    ValidationErrors,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styles: ``,
    imports: [SHARED_UI_MODULES],
})
export class SignUpComponent {
    protected config: EuiAppConfig = inject(CONFIG_TOKEN);
    public AUTH_ROUTES = {
        login: "/screen/auth/login",
        signUp: "/screen/auth/signup",
    };
    public isSuccess = false;
    public isError = false;
    public isDisabled = false;

    public signUpForm: FormGroup = new FormGroup(
        {
            username: new FormControl({ value: null, disabled: false }, [
                Validators.required,
            ]),
            email: new FormControl({ value: null, disabled: false }, [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl({ value: null, disabled: false }, [
                Validators.required,
                Validators.minLength(8),
            ]),
            confirmPassword: new FormControl({ value: null, disabled: false }, [
                Validators.required,
            ]),
        },
        { validators: this.passwordMatchValidator },
    );

    constructor(private router: Router) {}

    // Custom validator to check if passwords match
    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get("password");
        const confirmPassword = control.get("confirmPassword");

        if (!password || !confirmPassword) {
            return null;
        }

        return password.value === confirmPassword.value
            ? null
            : { passwordMismatch: true };
    }

    onReset() {
        this.signUpForm.reset();
        this.isError = false;
        this.isSuccess = false;
    }

    onSubmit() {
        this.signUpForm.markAllAsTouched();

        if (this.signUpForm.status !== "VALID") {
            this.isError = true;
            this.isSuccess = false;
            this.isDisabled = false;
        } else {
            this.isSuccess = true;
            this.isError = false;
            this.isDisabled = true;

            setTimeout(() => {
                this.router.navigate([this.AUTH_ROUTES.login]);
            }, 2000);
        }
    }

    navigateToSignIn() {
        this.router.navigate([this.AUTH_ROUTES.login]);
    }

    render(controlName: string): boolean {
        const control = this.signUpForm?.get(controlName);

        if (controlName === "confirmPassword") {
            return (
                control?.invalid &&
                control?.touched &&
                (control?.hasError("required") ||
                    this.signUpForm?.hasError("passwordMismatch"))
            );
        }

        return (
            control?.invalid &&
            control?.touched &&
            control?.hasError("required")
        );
    }
}
