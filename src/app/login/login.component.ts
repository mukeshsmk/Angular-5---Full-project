import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../shared/services/AuthService";
import { ApiService } from "../shared/services/ApiServices";

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: "sd-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  loaderOne: Boolean = false;
  public _token: any;
  user = {
    email: "",
    password: ""
  };
  isLoginError: Boolean = false;
  infoMessage = "";
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public apiService: ApiService
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/home"]);
    }
  }

  onSubmit() {
    if (this.user) {
      this.loaderOne = true;
      this.http
        .post<{ success: object }>(this.apiService.loginUrl, this.user)
        .subscribe(
          response => {
            this._token = response.success;
            console.log("Token", response.success);
            localStorage.setItem(
              "access_token",
              JSON.stringify(this._token.access_token)
            );
            localStorage.setItem(
              "user_data",
              JSON.stringify(this._token.userData)
            );
            console.log(JSON.stringify(this._token.userData));

            this.infoMessage = "Login Success!";
            this.loaderOne = false;
            this.router.navigate(["/home"]);
            setTimeout(() => {
              console.log("hide");
              this.infoMessage = "";
            }, 5000);
          },
          (err: HttpErrorResponse) => {
            this.isLoginError = true;
            this.loaderOne = false;
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
