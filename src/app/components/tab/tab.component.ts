/**
 * A single tab page. It renders the passed template
 * via the @Input properties by using the ngTemplateOutlet
 * and ngTemplateOutletContext directives.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'sd-tab',
  styles: [
    `
      .pane {
        padding: 1em;
      }

      @media (max-width: 768px){
        .pane {
          padding: 0;
        }
        }
    `
  ],
  template: `
    <div [hidden]='!active' class='pane'>
      <ng-content></ng-content>
      <ng-container
        *ngIf='template'
        [ngTemplateOutlet]='template'
        [ngTemplateOutletContext]='{ data: dataContext }'
      >
      </ng-container>
    </div>
  `
})
export class TabComponent {
  @Input('tabTitle') title: string;
  @Input() tabId: string = '';
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() template: any;
  @Input() dataContext: any;
}
