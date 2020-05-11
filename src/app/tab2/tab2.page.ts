import { Component, ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';

import { ColorsService } from '../services/colors.service';
import { AnimationsService, Animation } from '../services/animations.service';
import { SelectLedService } from '../services/select-led.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('reorder1') reorderGroupColors: IonReorderGroup;
  @ViewChild('reorder2') reorderGroupAnimations: IonReorderGroup;
  favColors: string[];
  favAnimations: Animation[];

  constructor(
    private colorsService: ColorsService,
    private animationService: AnimationsService,
    private selectLedService: SelectLedService
  ) {
    this.favColors = this.colorsService.getAllColors();
    this.favAnimations = this.animationService.getAllFavAnimations();
  }

  deleteColor(color: string): void {
    this.colorsService.deleteColor(color);
  }

  doReorderColors(ev: any): void {
    this.colorsService.reorderColors(ev.detail.from, ev.detail.to);
    ev.detail.complete();
  }

  doReorderAnimations(ev: any): void {
    this.animationService.reorderFavAnimations(ev.detail.from, ev.detail.to);
    ev.detail.complete();
  }

  toggleReorderGroup(): void {
    this.reorderGroupColors.disabled = !this.reorderGroupColors.disabled;
    this.reorderGroupAnimations.disabled = !this.reorderGroupAnimations.disabled;
  }

  sendColor(color: string): void {
    this.colorsService.sendColor(color);
  }

  sendAnimation(animation: Animation): void {
    this.animationService.sendAnimation(animation, 1);
  }

  removeFavAnimation(animation: Animation): void {
    this.animationService.removeFavorite(animation);
  }

  selectLed() {
    this.selectLedService.presentLedSelection();
  }
}
