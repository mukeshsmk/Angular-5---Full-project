import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'sd-modal',
  templateUrl: 'modal.component.html',
  styleUrls: [ 'modal.component.css' ]
})
export class ModalComponent {
  private bodyText: string;
  constructor(private router: Router) {}
}
