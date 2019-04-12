import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
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

   loginForm : FormGroup;

  constructor( private formBuilder: FormBuilder, private http: HttpClient) { 

}

onSubmit() {


  if(this.user){
    this.http.post('http://10.0.0.3:8080/api/login',this.user)
    .subscribe(data => {
      let resp = JSON.stringify(data);
      console.log(resp)
  })

  console.log(this.user)

}
}
}