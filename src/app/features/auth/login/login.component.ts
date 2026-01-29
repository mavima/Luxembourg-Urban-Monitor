import { Component, inject } from "@angular/core";
import { CONFIG_TOKEN, EuiAppConfig } from "@eui/core";
import { SHARED_UI_MODULES } from "src/app/shared-modules";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EuiGrowlService } from "@eui/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthActions } from "src/app/core/stores/auth/auth.actions";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styles: ``,
    imports: [SHARED_UI_MODULES],
    providers: [EuiGrowlService],
})
export class LoginComponent {
    protected config: EuiAppConfig = inject(CONFIG_TOKEN);
    private store = inject(Store);
    private router = inject(Router);
    public isSuccess = false;
    public isError = false;
    public isDisabled = false;
    public username = "";
    public password = "";

    public loginForm: FormGroup = new FormGroup({
        username: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
    });

    onChangeValue() {
        this.username = this.loginForm.get("control").getRawValue();
        this.password = this.loginForm.get("control").getRawValue();
    }

    onSubmit() {
        // this.loginForm.markAllAsTouched();
        // if (this.loginForm.valid) {
        //     this.isSuccess = true;
        //     this.isError = false;
        //     this.isDisabled = true;
        //     const credentials = this.loginForm.value;
        //     // Dispatch the action
        //     this.store.dispatch(AuthActions.loginRequested({ credentials }));

        //     // Redirect to /screen/home after 3 seconds
        //     setTimeout(() => {
        //         this.router.navigate(["/home"]);
        //     }, 3000);
        // } else {
        //     this.isError = true;
        //     this.isSuccess = false;
        //     this.isDisabled = false;
        //     this.loginForm.markAllAsTouched();
        // }
        this.store.dispatch(AuthActions.loginRequested());
    }

    onReset() {
        this.loginForm.reset();
        this.isError = false;
        this.isSuccess = false;
    }

    navigateToSignUp() {
        this.router.navigate(["/auth/signup"]);
    }

    render(controlName: string): boolean {
        return (
            this.loginForm?.get(controlName).invalid &&
            this.loginForm?.get(controlName).touched &&
            this?.loginForm.get(controlName).hasError("required")
        );
    }
}
