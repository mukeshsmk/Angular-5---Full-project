import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: "sd-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"]
})
export class LoginComponent {
  public _token: any;
  user = {
    email: "",
    password: ""
  };
  isLoginError: boolean = false;
  infoMessage = "";
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit() {
    if (this.user) {
      this.http
        .post<{ success: object }>("http://10.0.0.2:8080/api/login", this.user)
        .subscribe(
          response => {
            console.log("Success ", JSON.stringify(response));
            this._token = response.success;
            localStorage.setItem(
              "access_token",
              JSON.stringify(this._token.token)
            );
            this.infoMessage = "Login Success!";
            this.router.navigate(["/home"]);
            setTimeout(() => {
              console.log("hide");
              this.infoMessage = "";
            }, 5000);
          },
          (err: HttpErrorResponse) => {
            this.isLoginError = true;

            setTimeout(() => {
              console.log("hide");
              this.isLoginError = false;
            }, 5000);
          }
        );
    }

    console.log(this.user);
  }
}
