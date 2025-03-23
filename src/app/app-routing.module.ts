import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404pageComponent } from './shared/pages/error404page/error404page.component';
import { AuthGuard } from './auth/services/authGuard.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'mantainer',
    canActivate: [AuthGuard],
    loadChildren: () => import('./mantainer/mantainer.module').then(m => m.MantainerModule)
  },
  {
    path: 'skills',
    canActivate: [AuthGuard],
    loadChildren: () => import('./skills/skills.module').then(m => m.SkillsModule)
  },
  {
    path: '404',
    component: Error404pageComponent
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
