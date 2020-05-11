import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimationCreationPageRoutingModule } from './animation-creation-routing.module';

import { AnimationCreationPage } from './animation-creation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimationCreationPageRoutingModule
  ],
  declarations: [AnimationCreationPage]
})
export class AnimationCreationPageModule {}
