import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ApiService } from './core/api.service';
import { TokenInterceptor } from './core/interceptor';
import { Utils } from './core/util.methods';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeLayoutComponent } from './layout/home-layout.component';
import { HeaderComponent } from './layout/header/header.component';

import { FooterComponent } from './layout/footer/footer.component';
import { TransactionComponent } from './transaction/create/transaction.component';
import { AppMessageQueuService } from './core/appmsgque.service';
import { GroupComponent } from './group/group.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { EditComponent } from './transaction/edit/edit.component';
import { SettlementComponent } from './transaction/settlement/settlement.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeLayoutComponent,
    HeaderComponent,
    TransactionComponent,
    FooterComponent,
    RegisterComponent,
    TransactionComponent,
    GroupComponent,
    EditGroupComponent,
    EditComponent,
    SettlementComponent

  ],
  imports: [
    BrowserModule,
    NgxLoadingModule.forRoot({}),
    ReactiveFormsModule,
    HttpClientModule,
   
  
    AppRoutingModule
  ],
  providers: [ApiService, {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi : true}, Utils, AppMessageQueuService],
  bootstrap: [AppComponent]
})
export class AppModule { }