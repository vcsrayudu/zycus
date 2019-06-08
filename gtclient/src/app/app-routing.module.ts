import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeLayoutComponent } from './layout/home-layout.component';
import { TransactionComponent } from './transaction/create/transaction.component';
import { GroupComponent } from './group/group.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { EditComponent } from './transaction/edit/edit.component';
import { SettlementComponent } from './transaction/settlement/settlement.component';
const routes: Routes = [
    {
      path: 'home',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'transaction',
       
        component: TransactionComponent
      },
      {
        path: 'edit-trx',
       
        component: EditComponent
      },
      {
        path: 'settlement',
       
        component: SettlementComponent
      },
      {
        path: 'group',
       
        component: GroupComponent
      },
      {
        path: 'edit-group',
       
        component: EditGroupComponent
      }
    ]
  },
  {
  path: 'login',
  component: LoginComponent,
 
},
{
  path: 'register',
  component: RegisterComponent,
 
},


{ path: '', component: LoginComponent },
{ path: '**', redirectTo: 'login' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
