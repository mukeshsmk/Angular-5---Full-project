
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({

  moduleId: module.id,
  selector: 'sd-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})
export class SignupComponent {

 public validationErr:any;
 public duplicateEmail:any;
 public notSame : any;
  user = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  }


  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {


  }

  onSubmit() {

    if (this.user) {
      this.http.post<{ success: object }>('http://10.0.0.3:8080/api/register', this.user)
        .subscribe((response) => {
          console.log('Success ', JSON.stringify(response));
          localStorage.setItem('access_token', JSON.stringify(response.success));

        },
        (err : HttpErrorResponse)=>{
            
            console.log('error',err.error.errors)
            this.validationErr = err.error.errors;
            this.duplicateEmail=err.error.errors.email[0];
            this.notSame = err.error.errors.confirm_password[0];
            console.log(this.duplicateEmail,this.notSame)
          })

    }

    console.log(this.user)
  }
}


