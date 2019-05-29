import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'sd-nav-form',
  templateUrl: 'nav-form.component.html',
  styleUrls: [ 'nav-form.component.css' ]
})
export class NavFormComponent implements OnInit {
  opportunityForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {}

  closeModal() {}
}
