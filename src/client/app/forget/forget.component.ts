import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
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

   
  user = {
    email:'',
   }

   loginForm : FormGroup;

   constructor( private formBuilder: FormBuilder, private http: HttpClient) { 

  }

 }
