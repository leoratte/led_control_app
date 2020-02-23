import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { LedConnection } from '../led-connection';
import { Tab2Page } from '../tab2/tab2.page';
import { ColorsService } from '../colors/colors.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  ledConnection: LedConnection;
  red = 255;
  green = 255;
  blue = 255;
  brightness = 1.0;

  constructor(app: AppComponent, private colors: ColorsService) {
    this.ledConnection = app.getLedConnection();
  }

  getManualColor() {
    const rgb = [
      Math.floor(this.red * this.brightness),
      Math.floor(this.green * this.brightness),
      Math.floor(this.blue * this.brightness)
    ];
    return this.rgbToHex(rgb);
  }

  updatePreview() {}

  addFav() {
    this.colors.addColor(this.getManualColor());
  }

  applyPreview() {
    this.ledConnection.sendStatic(this.getManualColor());
  }


  rgbToHex(rgb) {
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
}
