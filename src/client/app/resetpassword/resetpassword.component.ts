import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-resetpassword',
  templateUrl: 'resetpassword.component.html',
  styleUrls: ['resetpassword.component.css']
})
export class ResetPasswordComponent {

  user = {
    email:'',
   }
   public validationErr:any;

   public notSame : any;

   resetpasswordForm : FormGroup;
   isEmailError : boolean = false;
   constructor( private formBuilder: FormBuilder, private http: HttpClient) { 

  }

  onSubmit() {
//   if(this.user){
//     this.http.post<{success: object}>('http://10.0.0.3:8080/api/password/email',this.user)
//     .subscribe((response)=>{
//       console.log('Success ',JSON.stringify(response));
//       this._token = response.success;
//       localStorage.setItem('access_token', JSON.stringify(this._token.token ));    

//     },  (err : HttpErrorResponse)=>{
//       this.isEmailError = true;
      
//       setTimeout(() => {
//         console.log('hide');
//         this.isEmailError = false;
//       }, 5000);
//     });
     

//   }

}
}
