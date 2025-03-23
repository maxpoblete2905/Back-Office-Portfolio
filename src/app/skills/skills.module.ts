import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './pages/layout/layout.component';
import { ListPageComponent } from './pages/listPage/listPage.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSkillComponent } from './pages/addPage/addPage.component';
import { SkillsRoutingModule } from './skills-routing.module';


@NgModule({
  declarations: [
    LayoutComponent,
    AddSkillComponent,
    ListPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkillsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]

})
export class SkillsModule { }
