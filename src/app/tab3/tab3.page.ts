import { Component, ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';

import { AnimationsService, Animation, CustomAnimation } from '../services/animations.service';
import { SelectLedService } from '../services/select-led.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('reorder1') reorderGroupAnimations: IonReorderGroup;
  @ViewChild('reorder2') reorderGroupCustomAnimations: IonReorderGroup;

  animations: Animation[] = [];
  customAnimations: CustomAnimation[] = [];
  speed = 1;

  constructor(
    private animationService: AnimationsService,
    private selectLedService: SelectLedService
    ) {
    this.animations = this.animationService.getAllAnimations();
    this.customAnimations = this.animationService.getAllCustomAnimations();
  }

  toggleReorderGroup(): void {
    this.reorderGroupAnimations.disabled = !this.reorderGroupAnimations.disabled;
  }

  doReorderAnimations(ev: any): void {
    this.animationService.reorderAnimations(ev.detail.from, ev.detail.to);
    ev.detail.complete();
  }

  doReorderCustomAnimations(ev: any): void {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    ev.detail.complete();
  }

  sendAnimation(animation: Animation): void {
    this.animationService.sendAnimation(animation, this.speed);
  }

  addFavorite(animation: Animation): void {
    this.animationService.addFavAnimation(animation);
  }

  selectLed() {
    this.selectLedService.presentLedSelection();
  }

  removeCustom(animation: CustomAnimation): void {
    this.animationService.removeCustom(animation);
  }
}
