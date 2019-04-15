import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OpportunityComponent } from './opportunity.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'opportunity', component: OpportunityComponent }
    ])
  ],
  exports: [RouterModule]
})
export class OpportunityRoutingModule { }
