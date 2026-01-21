import { Component, inject } from "@angular/core";
import { CONFIG_TOKEN, EuiAppConfig } from "@eui/core";
import { SHARED_UI_MODULES } from "src/app/shared-modules";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EuiGrowlService } from "@eui/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styles: ``,
    imports: [SHARED_UI_MODULES],
    providers: [EuiGrowlService],
})
export class LoginComponent {
    protected config: EuiAppConfig = inject(CONFIG_TOKEN);

    public isSuccess = false;
    public isError = false;
    public isDisabled = false;
    public username = "";
    public password = "";

    public loginForm: FormGroup = new FormGroup({
        username: new FormControl({ value: null, disabled: false }, [
            Validators.required,
        ]),
        password: new FormControl({ value: null, disabled: false }, [
            Validators.required,
        ]),
    });

    constructor(private router: Router) {}

    onChangeValue() {
        this.username = this.loginForm.get("control").getRawValue();
        this.password = this.loginForm.get("control").getRawValue();
    }

    onReset() {
        this.loginForm.reset();
        this.isError = false;
        this.isSuccess = false;
    }

    onSubmit() {
        this.loginForm.markAllAsTouched();
        if (this.loginForm.status !== "VALID") {
            this.isError = true;
            this.isSuccess = false;
            this.isDisabled = false;
        } else {
            this.isSuccess = true;
            this.isError = false;
            this.isDisabled = true;

            // Redirect to /screen/home after 3 seconds
            setTimeout(() => {
                this.router.navigate(["/screen/home"]);
            }, 3000);
        }
    }

    navigateToSignUp() {
        this.router.navigate(["/screen/auth/signup"]);
    }

    render(controlName: string): boolean {
        return (
            this.loginForm?.get(controlName).invalid &&
            this.loginForm?.get(controlName).touched &&
            this?.loginForm.get(controlName).hasError("required")
        );
    }
}
