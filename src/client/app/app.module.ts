import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// import { RegistrationService } from './service/registration.service';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { ForgetModule } from './forget/forget.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ResetPasswordModule } from './resetpassword/resetpassword.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { TableListModule } from './components/table-list/table-list.module';
import { HeaderModule } from './components/header/header.module';
import { ModalModule } from './components/modal/modal.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ProfileModule } from './components/profile/profile.module';

import { GeneralService } from './shared/services/GeneralService';
import { AuthService } from './shared/services/AuthService';
import { AuthGuardService } from './shared/services/AuthGuardService';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    SignupModule,
    LoginModule,
    ForgetModule,
    ReactiveFormsModule,
    FormsModule,
    ResetPasswordModule,
    SidebarModule,
    TableListModule,
    HeaderModule,
    ModalModule,
    DashboardModule,
    ProfileModule,
    SharedModule.forRoot()
    /**
     * In order to start the Service Worker in Production located at '/ngsw-worker.js'
     * uncomment this line. More about Service Workers here
     * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
     */
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: String('<%= BUILD_TYPE %>') === 'prod' })
  ],
  declarations: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    },
    AuthGuardService,
    GeneralService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
