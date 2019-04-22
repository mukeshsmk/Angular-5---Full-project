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
  submitted = false;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      name: ["Testing"],
      assigned_to_user_c: ["Manikandan"],
      subject: [""],
      due_date: [""],
      status: [""],
      assigned_to_sfid: [""],
      type_c: [""],
      opportunity__c: [""]
    });
  }

  get f() {
    return this.taskForm.controls;
  }

  onTaskSubmit() {
    console.log("On Submit Clicked");
    // stop here if form is invalid
    if (this.taskForm.invalid) {
      return;
    }

    this.http
      .post<{ success: object }>(
        Config.BASE_URL + "api/activities",
        this.taskForm.value
      )
      .subscribe((response: any) => {
        this.submitted = true;
      });
  }
}
