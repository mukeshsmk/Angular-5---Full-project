import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService as AuthGuard } from './shared/services/AuthGuardService';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: '' },
      { path: 'dashboard', component: DashboardComponent },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
