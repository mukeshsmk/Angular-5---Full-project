import { NgModule } from '@angular/core';
import { OpportunityComponent } from './opportunity.component';
import { OpportunityRoutingModule } from './opportunity-routing.module';


@NgModule({
  imports: [OpportunityRoutingModule],
  declarations: [OpportunityComponent],
  exports: [OpportunityComponent]
})
export class OpportunityModule { 

}
