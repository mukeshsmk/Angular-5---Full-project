import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-forget',
  templateUrl: 'forget.component.html',
  styleUrls: ['forget.component.css']
})
export class ForgetComponent {

   public _token:any;
  user = {
    email:'',
   }

   forgetForm : FormGroup;
   isEmailError : boolean = false;
   constructor( private formBuilder: FormBuilder, private http: HttpClient) { 

  }

  onSubmit() {
  if(this.user){
    this.http.post<{success: object}>('http://10.0.0.3:8080/api/password/email',this.user)
    .subscribe((response)=>{
      console.log('Success ',JSON.stringify(response));
      this._token = response.success;
      localStorage.setItem('reset_password_token', JSON.stringify(this._token.token )); 
      
    },  (err : HttpErrorResponse)=>{
      this.isEmailError = true;
      
      setTimeout(() => {
        console.log('hide');
        this.isEmailError = false;
      }, 5000);
    });
     

  }
}
}
