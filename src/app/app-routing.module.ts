import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
//import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
//import { RegisterComponent } from './register';
//import { AuthGuard } from './_guards';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  //{ path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
