import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { HttpErrorResponse } from '@angular/common/http';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent { 
 
  user = {
    email:'',
    password:'',
   }
   isLoginError : boolean = false;

   loginForm : FormGroup;

  constructor( private formBuilder: FormBuilder, private http: HttpClient) { 

}

onSubmit() {


  if(this.user){
    this.http.post<{success: object}>('http://10.0.0.3:8080/api/login',this.user)
    .subscribe((response)=>{
      console.log('Success ',JSON.stringify(response));
      localStorage.setItem('access_token', JSON.stringify(response.success));
      
    },  (err : HttpErrorResponse)=>{
      this.isLoginError = true;
      
      setTimeout(() => {
        console.log('hide');
        this.isLoginError = false;
      }, 5000);
    });
     
   
  }
  
  console.log(this.user)
  }

}
