import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimationCreationPage } from './animation-creation.page';

const routes: Routes = [
  {
    path: '',
    component: AnimationCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimationCreationPageRoutingModule {}
