import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { ApiService } from "../services/ApiServices";

@Injectable()
export class VehicleModelService {
  constructor(
    private httpService: HttpClient,
    private apiService: ApiService
  ) {}

  search(url, term) {
    const searchData = { term: term };
    var listOfModel = this.httpService.post(url, searchData).pipe(
      debounceTime(50), // WAIT FOR 50 MILISECONDS ATER EACH KEY STROKE.
      map((data: any) => {
        return data.length != 0
          ? (data as any)
          : [{ BookName: "No Record Found" } as any];
      })
    );

    return listOfModel;
  }
}
