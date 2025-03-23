import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListPageComponent } from './pages/listPage/listPage.component';
import { AddSkillComponent } from './pages/addPage/addPage.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'list',
        component: ListPageComponent
      },
      {
        path: 'add',
        component: AddSkillComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillsRoutingModule { }
