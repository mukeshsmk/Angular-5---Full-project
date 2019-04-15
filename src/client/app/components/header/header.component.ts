import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('access_token');
    this.router.navigate(['/http://localhost:5555/login']);
}

}
