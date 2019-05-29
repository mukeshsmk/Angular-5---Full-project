import { Component, OnInit } from '@angular/core';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'sd-userdetails',
  templateUrl: 'userdetails.component.html',
  styleUrls: [ 'userdetails.component.css' ]
})
export class UserdetailsComponent {
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;
}
