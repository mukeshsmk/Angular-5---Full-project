import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GeneralService } from "../../shared/services/GeneralService";
import { ApiService } from "../../shared/services/ApiServices";
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: "sd-opportunity",
  templateUrl: "opportunity.component.html",
  styleUrls: ["opportunity.component.css"]
})
export class OpportunityComponent implements OnInit {
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;
  visibleThree: Boolean = true;
  visibleFour: Boolean = true;
  visibleFive: Boolean = true;
  visibleSix: Boolean = true;
  visibleSeven: Boolean = true;
  loaderOne: Boolean = false;
  @Input() opportunity: any;

  constructor(
    private http: HttpClient,
    public generalService: GeneralService,
    public apiService: ApiService
  ) {}

  ngOnInit() {
    this.loaderOne = true;
    let data = {
      lead_id: this.opportunity.id
    };
    this.http
      .post<{ success: object }>(this.apiService.leadEditFetchUrl, data)
      .subscribe((response: any) => {
        if (!response.error) {
          this.opportunity = response;
        }
        this.loaderOne = false;
      });
  }
}
