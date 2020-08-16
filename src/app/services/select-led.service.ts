import { Injectable } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { StorageService } from './storage.service';
import { ManageLedComponent } from '../components/manage-led/manage-led.component';

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
  private ledmap: Led[] = [
    {id: 0, name: 'all' , enabled: true },
    {id: 1, name: 'LED1' , enabled: true },
    {id: 2, name: 'LED2' , enabled: false },
    {id: 3, name: 'LED3' , enabled: false },
    {id: 4, name: 'LED4' , enabled: false },
  ];
  private led: Led = this.ledmap[0];

  constructor(
    private storageService: StorageService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
    ) {
      this.load();
    }

  getLed(): number {
    return this.led.id;
  }

  load(): void {
    this.storageService.load(LEDMAP_KEY).then((ledmap: Led[]) => {
      if (ledmap != null) {
        if (ledmap.length === 5) {
          this.ledmap = ledmap;
        }
      }
      
    });
  }

  store(): void {
    this.storageService.store(LEDMAP_KEY, this.ledmap);
  }

  async presentLedSelection() {
    const buttons: any[] = [];
    for (const led of this.ledmap) {
      if (led.enabled) {
        const bulb = (led === this.led) ? 'bulb-outline' : 'bulb';
        buttons.push({
          text: led.name,
          icon: bulb,
          handler: () => {
            this.led = led;
          }
        });
    }
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

  async presentManageLed() {
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: ManageLedComponent,
      componentProps: {
        ledmap: this.ledmap
      }
    });

    modal.onDidDismiss().then((detail) => {
      if (detail.data !== undefined) {
        this.ledmap = detail.data;
        this.store();
      }
   });
    return await modal.present();
  }
}
