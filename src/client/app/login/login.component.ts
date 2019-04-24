import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../shared/services/AuthService";
import Config from '../shared/config';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
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
  isLoginError: boolean = false;
  infoMessage = "";
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
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
        .post<{ success: object }>(Config.BASE_URL + "api/login", this.user)
        .subscribe(
          response => {
            this._token = response.success;
            console.log("Token", response.success);
            localStorage.setItem(
              "access_token",
              JSON.stringify(this._token.access_token)
            );
            
            this.infoMessage = "Login Success!";
            this.loaderOne=false;
            this.router.navigate(["/home"]);
            setTimeout(() => {
              console.log("hide");
              this.infoMessage = "";
            }, 5000);
          },
          (err: HttpErrorResponse) => {
            this.isLoginError = true;
            this.loaderOne=false;
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
