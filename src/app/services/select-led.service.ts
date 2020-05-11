import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SelectLedService {
  private leds: string[] = ['all', 'bed', 'desk', 'closet'];
  private led = 'all';

  constructor(private actionSheetCtrl: ActionSheetController) {  }

  getLed(): string {
    return this.led;
  }

  async presentLedSelection() {
    const buttons: any[] = [];
    for (const led of this.leds) {
      buttons.push({
        text: led,
        icon: 'bulb',
        handler: () => {
          this.led = led;
        }
      });
    }
    buttons.push({
      text: 'cancel',
      icon: 'close',
      role: 'cancel'
    });

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'LEDs',
      buttons: [...buttons]
    });
    await actionSheet.present();
  }
}
