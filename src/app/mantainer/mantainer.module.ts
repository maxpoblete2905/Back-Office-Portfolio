import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './pages/layout/layout.component';
import { ListPageComponent } from './pages/listPage/listPage.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPageComponent } from './pages/addPage/addPage.component';
import { MantainerRoutingModule } from './mantainer-routing.module';


@NgModule({
  declarations: [
    LayoutComponent,
    AddPageComponent,
    ListPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MantainerRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]

})
export class MantainerModule { }
