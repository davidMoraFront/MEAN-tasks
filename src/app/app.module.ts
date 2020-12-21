import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { ListsComponent } from './pages/lists/lists.component';
import { ModalOptionsComponent } from './pages/modal-options/modal-options.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebReqInterceptorService } from './services/web-req-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    ListsComponent,
    ModalOptionsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WebReqInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  // schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
