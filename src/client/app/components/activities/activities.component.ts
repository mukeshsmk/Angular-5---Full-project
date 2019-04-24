import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import Config from "../../shared/config";
@Component({
  moduleId: module.id,
  selector: "sd-activities",
  templateUrl: "activities.component.html",
  styleUrls: ["activities.component.css"]
})
export class ActivitiesComponent implements OnInit {
  taskForm: FormGroup;
  callForm: FormGroup;
  eventForm: FormGroup;
  emailForm: FormGroup;
  submitted = false;
  userData:any;

  @Input() opportunity: any;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    console.log(this.userData);
    this.taskForm = this.formBuilder.group({
      name: [this.opportunity.first_name__c],
      assigned_to: [this.userData.dealer],
      subject__c: ["",Validators.required],
      end_date__c: ["",Validators.required],
      status__c: ["",Validators.required],
      assigned_to_user__c: [this.userData.user_sfid],
      type__c: ["Task"],
      opportunity__c: [this.opportunity.sfid]
    });
    this.callForm = this.formBuilder.group({
      name: [this.opportunity.first_name__c],
      subject__c: ["",Validators.required],
      comments__c: ["",Validators.required],
      assigned_to_user__c: [this.userData.user_sfid],
      type__c: ["Log a Call"],
      opportunity__c: [this.opportunity.sfid]
    });
    this.eventForm = this.formBuilder.group({
      name: [this.opportunity.first_name__c],
      subject__c: ["",Validators.required],
      start_date__c: ["",Validators.required],
      end_date__c: ["",Validators.required],
      assigned_to: [this.userData.dealer],
      location__c: ["",Validators.required],
      all_day_flag__c: [""],
      assigned_to_user__c: [this.userData.user_sfid],
      type__c: ["Event"],
      opportunity__c: [this.opportunity.sfid]
    });
    this.emailForm = this.formBuilder.group({
      from__c: ["",Validators.required],
      subject__c: ["",Validators.required],
      to__c: ["",Validators.required],
      bcc__c: ["",Validators.required],
      assigned_to_user__c: [this.userData.user_sfid],
      type__c: ["Email"],
      opportunity__c: [this.opportunity.sfid]
    });
  }

  get f() {
    return this.taskForm.controls;
  }

  onSubmit(form:any) {
    // stop here if form is invalid
    if (form.invalid) {
      return;
    }

    this.http
      .post<{ success: object }>(
        Config.BASE_URL + "api/activities",
        form.value
      )
      .subscribe((response: any) => {
        this.submitted = true;
        form.reset();
      });
  }
}
