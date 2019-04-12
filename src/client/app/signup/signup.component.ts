
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
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
  user = {
   name:'',
   email:'',
   password:'',
   c_password:'',
  }
  
  

  registerForm : FormGroup;

  constructor( private formBuilder: FormBuilder,private http: HttpClient) { 


}
onSubmit() {

if(this.user){
  this.http.post<{access_token: string}>('http://10.0.0.3:8080/api/register',this.user)
  .subscribe((response)=>{
    console.log('Success ',response);
    localStorage.setItem('access_token', response.access_token);
    
  },
   error => console.log('error',error))
 
}

console.log(this.user)
}


}


