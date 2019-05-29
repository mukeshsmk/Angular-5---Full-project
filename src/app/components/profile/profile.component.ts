import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Config from '../../shared/config';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'sd-profile',
  templateUrl: 'profile.component.html',
  styleUrls: [ 'profile.component.css' ]
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}
  passwordForm: FormGroup;
  submitted: boolean = false;
  upperCaseErr: boolean = false;
  lowerCaseErr: boolean = false;
  numberErr: boolean = false;
  lengthErr: boolean = false;
  passwordSuccess: boolean = false;
  userData: any;

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user_data'));
    this.passwordForm = this.formBuilder.group({
      password: [ '', Validators.required ],
      confirm_password: [
        '',
        [ Validators.required, this.passwordMatcher.bind(this) ]
      ],
      auth_id: [ this.userData.auth_id, Validators.required ]
    });
  }
  // confirm new password validator
  private passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
      this.passwordForm &&
      control.value !== this.passwordForm.controls.password.value
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }
  passwordData(data: any) {
    let ucase = new RegExp('[A-Z]+');
    let lcase = new RegExp('[a-z]+');
    let num = new RegExp('[0-9]+');
    if (data.length >= 8) {
      this.lengthErr = true;
    } else {
      this.lengthErr = false;
    }
    if (ucase.test(data)) {
      this.upperCaseErr = true;
    } else {
      this.upperCaseErr = false;
    }
    if (lcase.test(data)) {
      this.lowerCaseErr = true;
    } else {
      this.lowerCaseErr = false;
    }
    if (num.test(data)) {
      this.numberErr = true;
    } else {
      this.numberErr = false;
    }
    if (num.test(data)) {
      this.numberErr = true;
    } else {
      this.numberErr = false;
    }
  }
  onSubmit() {
    this.submitted = true;

    if (
      this.passwordForm.invalid ||
      !this.upperCaseErr ||
      !this.lowerCaseErr ||
      !this.numberErr
    ) {
      return;
    }
    this.http
      .post<{ success: object }>(
        Config.BASE_URL + 'api/updatePassword',
        this.passwordForm.value
      )
      .subscribe((response: any) => {
        console.log(response);
        this.upperCaseErr = false;
        this.lowerCaseErr = false;
        this.numberErr = false;
        this.lengthErr = false;
        this.passwordSuccess = true;
        this.passwordForm.reset();
      });
  }
}
