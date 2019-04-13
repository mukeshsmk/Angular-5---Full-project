import { NgModule } from '@angular/core';
import { TableListComponent } from './table-list.component';
import { TableListRoutingModule } from './table-list-routing.module';


@NgModule({
  imports: [TableListRoutingModule],
  declarations: [TableListComponent],
  exports: [TableListComponent]
})
export class TableListModule { 

//   $(document).ready(function () {
//     $(document).on('click', '.cta', function () {
//         $(this).toggleClass('active')
//     })
// });


// $(document).ready(function(){
//     $(".hamburger").click(function(){
//         $('.sidebar-menu').removeClass("flowHide");  
//         $(".sidebar-menu").toggleClass("full-side-bar");
//         $('.nav-link-name').toggleClass('name-hide');        
//     });
// });





//  $(document).ready(function () {    
//       $(".nav-link").hover(function () {           
//           $('.sidebar-menu').removeClass("flowHide");  
//           $(this).addClass('tax-active');
              
//       }, function () {
//           $('.sidebar-menu')
//              .addClass("flowHide");
//           $(this).removeClass('tax-active');
             
//       });    
//   });
}
