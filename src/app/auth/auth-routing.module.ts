import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutPageComponent } from './pages/layoutPage/layoutPage.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [

      {
        path: 'login',
        component: LoginComponent
      },

      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
