import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../shared/services/AuthService";

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
      this.http
        .post<{ success: object }>("http://localhost:8080/api/login", this.user)
        .subscribe(
          response => {
            this._token = response.success;
            console.log("Token", response.success);
            localStorage.setItem(
              "access_token",
              JSON.stringify(this._token.access_token)
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
