import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeadComponent } from './components/head/head.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Error404pageComponent } from './pages/error404page/error404page.component';
import { ImagePerfilComponent } from './components/imagePerfil/imagePerfil.component';
import { DescriptionsComponent } from './components/descriptions/descriptions.component';
import { TitleComponent } from './components/title/title.component';
import { SocialNetworksComponent } from './components/socialNetworks/socialNetworks.component';
import { MenuComponent } from './components/menu/menu.component';
import { ImageviewerComponent } from './components/imageviewer/imageviewer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [
    Error404pageComponent,
    SidebarComponent,
    HeadComponent,
    ImagePerfilComponent,
    DescriptionsComponent,
    TitleComponent,
    SocialNetworksComponent,
    MenuComponent,
    ImageviewerComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    Error404pageComponent,
    SidebarComponent,
    HeadComponent,
    ImagePerfilComponent,
    DescriptionsComponent,
    TitleComponent,
    SocialNetworksComponent,
    MenuComponent,
    ImageviewerComponent,
    InputComponent
  ]
})
export class SharedModule { }
