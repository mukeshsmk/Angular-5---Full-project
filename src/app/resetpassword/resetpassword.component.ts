import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'sd-resetpassword',
  templateUrl: 'resetpassword.component.html',
  styleUrls: [ 'resetpassword.component.css' ]
})
export class ResetPasswordComponent {
  user = {
    password: '',
    password_confirmation: '',
    token: ''
  };
  public validationErr: any;

  public notSame: any;
  public _token: any;
  resetpasswordForm: FormGroup;
  isEmailError: Boolean = false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  onSubmit() {
    if (this.user) {
      this.user.token = localStorage.getItem('reset_password_token');
      this.http
        .post<{ success: object }>(
          'http://10.0.0.3:8080/api/password/reset',
          this.user
        )
        .subscribe(
          (response) => {
            console.log('Success ', JSON.stringify(response));
            this._token = response.success;
            localStorage.setItem(
              'reset_password_token',
              JSON.stringify(this._token.token)
            );
          },
          (err: HttpErrorResponse) => {
            this.isEmailError = true;

            setTimeout(() => {
              console.log('hide');
              this.isEmailError = false;
            }, 5000);
          }
        );
    } else {
      console.log(this.user);
    }
  }
}
