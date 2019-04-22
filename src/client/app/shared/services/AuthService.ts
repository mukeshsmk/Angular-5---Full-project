// src/app/auth/auth.service.ts

import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  constructor() {}

  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem("access_token");
    console.log("Login Token: ", token);
    // Check whether the token is expired and return
    // true or false
    return token ? true : false;
  }
}
