import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { StorageService } from './storage.service';

export interface Led {
  id: number;
  name: string;
  enabled: boolean;
}

const LEDMAP_KEY = 'ledmap';

@Injectable({
  providedIn: 'root'
})

export class SelectLedService {
  private leds: number[] = [0, 1, 2, 3, 4];
  private ledmap: Led[] = [
    {id: 0, name: 'all' , enabled: true },
    {id: 1, name: 'LED1' , enabled: false },
    {id: 2, name: 'LED2' , enabled: false },
    {id: 3, name: 'LED3' , enabled: false },
    {id: 4, name: 'LED4' , enabled: false },
  ]
  private led: Led = this.ledmap[0];

  constructor(
    private storageService: StorageService,
    private actionSheetCtrl: ActionSheetController
    ) {
      this.load();
    }

  getLed(): number {
    return this.led.id;
  }

  setLedMap(ledmap: Led[]): void {
    this.ledmap = ledmap;
    this.store();
  }

  getLedMap(): Led[] {
    return this.ledmap;
  }

  load(): void {
    this.storageService.getItems(LEDMAP_KEY).then((ledmap: Led[]) => {
      this.ledmap = ledmap;
    });
  }

  store(): void {
    this.storageService.store(LEDMAP_KEY, this.ledmap);
  }

  async presentLedSelection() {
    const buttons: any[] = [];
    for (const led of this.ledmap) {
      buttons.push({
        text: led.name,
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
