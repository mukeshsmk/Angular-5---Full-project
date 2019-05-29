import {
  Component,
  OnInit,
  Injectable,
  Output,
  EventEmitter
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { GeneralService } from "../../shared/services/GeneralService";
import { ApiService } from "../../shared/services/ApiServices";

@Injectable()
@Component({
  selector: "sd-personalActivities",
  templateUrl: "personalActivities.component.html",
  styleUrls: ["personalActivities.component.css"]
})
export class PersonalActivitiesComponent implements OnInit {
  taskForm: FormGroup;
  callForm: FormGroup;
  eventForm: FormGroup;
  emailForm: FormGroup;
  submitted = false;
  userData: any;
  notifications: any;
  inserttasksuccess: Boolean = false;
  insertcalllogsuccess: Boolean = false;
  inserteventsuccess: Boolean = false;
  insertemailsuccess: Boolean = false;

  loaderOne: Boolean = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public generalService: GeneralService,
    public apiService: ApiService
  ) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.taskForm = this.formBuilder.group({
      name: ["", Validators.required],
      assigned_to: ["", Validators.required],
      subject__c: ["", Validators.required],
      end_date__c: ["", Validators.required],
      status__c: ["", Validators.required],
      assigned_to_user__c: [this.userData.user_sfid],
      type__c: ["Task"]
    });
    this.callForm = this.formBuilder.group({
      name: ["", Validators.required],
      subject__c: ["", Validators.required],
      comments__c: ["", Validators.required],
      assigned_to_user__c: [this.userData.user_sfid],
      type__c: ["Log a Call"]
    });
    this.eventForm = this.formBuilder.group({
      name: ["", Validators.required],
      subject__c: ["", Validators.required],
      start_date__c: ["", Validators.required],
      end_date__c: ["", Validators.required],
      assigned_to: ["", Validators.required],
      location__c: ["", Validators.required],
      all_day_flag__c: [""],
      assigned_to_user__c: [this.userData.user_sfid],
      type__c: ["Event"]
    });
    this.emailForm = this.formBuilder.group({
      from__c: ["", Validators.required],
      subject__c: ["", Validators.required],
      to__c: ["", Validators.required],
      bcc__c: ["", Validators.required],
      assigned_to_user__c: [this.userData.user_sfid],
      type__c: ["Email"]
    });
  }

  get f() {
    return this.taskForm.controls;
  }

  onSubmit(form: any) {
    this.loaderOne = true;
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
      this.loaderOne = false;
      return;
    }

    this.http
      .post<{ success: object }>(
        this.apiService.personal_activitiesUrl,
        form.value
      )
      .subscribe((response: any) => {
        if (form.value.type__c === "Task") {
          this.inserttasksuccess = true;
        }
        if (form.value.type__c === "Log a Call") {
          this.insertcalllogsuccess = true;
        }
        if (form.value.type__c === "Event") {
          this.inserteventsuccess = true;
        }
        if (form.value.type__c === "Email") {
          this.insertemailsuccess = true;
        }
        this.submitted = false;
        form.reset();
        this.generalService.refreshCalendar();
        this.ngOnInit();
        this.loaderOne = false;

        //this.getNotificationdata();
      });
  }
  onClose(form: any) {
    this.submitted = false;
    form.reset();
    this.ngOnInit();
  }
}
