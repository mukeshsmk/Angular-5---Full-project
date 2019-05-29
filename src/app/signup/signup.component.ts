import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ApiService } from "./../shared/services/ApiServices";

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: "sd-signup",
  templateUrl: "signup.component.html",
  styleUrls: ["signup.component.css"]
})
export class SignupComponent {
  public validationErr: any;
  public duplicateEmail: any;
  public notSame: any;
  public _token: any;
  public token: any;
  user = {
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  };
  isSignupError: boolean = false;
  infoMessage = "";
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public apiService: ApiService
  ) {}

  onSubmit() {
    if (this.user) {
      this.http
        .post<{ success: object }>(this.apiService.registerUrl, this.user)
        .subscribe(
          response => {
            console.log("Success ", JSON.stringify(response.success));
            this._token = response.success;
            localStorage.setItem(
              "access_token",
              JSON.stringify(this._token.token)
            );
            this.infoMessage = "Registered Successfully!";
            setTimeout(() => {
              console.log("hide");
              this.infoMessage = "";
            }, 5000);
          },
          (err: HttpErrorResponse) => {
            setTimeout(() => {
              this.isSignupError = false;
              console.log("error", err.error.errors);
              this.validationErr = err.error.errors;
              this.duplicateEmail = err.error.errors.email[0];
              this.notSame = err.error.errors.confirm_password[0];
              console.log(this.duplicateEmail, this.notSame);
            }, 5000);
          }
        );
    }

    console.log(this.user);
  }
}
