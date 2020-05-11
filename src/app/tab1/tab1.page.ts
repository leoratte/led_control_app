import { Component, ViewChild } from '@angular/core';
import { ToastController, IonItem } from '@ionic/angular';

import { ColorsService } from '../services/colors.service';
import { SelectLedService } from '../services/select-led.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // @ViewChild('preview') previewItem: IonItem;
  red = 255;
  green = 255;
  blue = 255;
  brightness = 1.0;
  preview = '#ffffff';

  constructor(
    private colors: ColorsService,
    private toastCtrl: ToastController,
    private selectLedService: SelectLedService
  ) {}

  getManualColor(): string {
    const rgb = [
      Math.floor(this.red * this.brightness),
      Math.floor(this.green * this.brightness),
      Math.floor(this.blue * this.brightness)
    ];
    return this.rgbToHex(rgb);
  }

  updatePreview(): void {
    this.preview = this.getManualColor();
  }

  addFav(): void {
    this.colors.addColor(this.getManualColor());
    // toast
    this.toastCtrl
      .create({
        message: 'new favorite color added',
        position: 'top',
        duration: 1000
      })
      .then(val => {
        val.present();
      });
  }

  applyPreview(): void {
    this.colors.sendColor(this.getManualColor());
  }

  rgbToHex(rgb: number[]): string {
    let ret = '#';
    for (let i = 0; i < 3; i++) {
      let hex = Number(rgb[i]).toString(16);
      if (hex.length < 2) {
        hex = '0' + hex;
      }
      ret += hex;
    }
    return ret;
  }

  selectLed() {
    this.selectLedService.presentLedSelection();
  }
}
