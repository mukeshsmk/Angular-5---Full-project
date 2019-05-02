import { Component, OnInit, Input } from '@angular/core';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-customer',
  templateUrl: 'customer.component.html',
  styleUrls: ['customer.component.css']
})
export class CustomerComponent {
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;

  @Input() customer: any;
}
