import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { WebsocketService } from '../../services/websocket.service';
import { SelectLedService } from '../../services/select-led.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private websocketService: WebsocketService,
    private selectLedService: SelectLedService) { }

  ngOnInit() {}

  changeIp(): void {
    this.alertCtrl.create({
      header: 'Enter IP',
      inputs: [
        {
          name: 'IP',
          value: this.websocketService.getIp(),
          type: 'text',
          placeholder: 'ip'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger'
        },
        {
          text: 'Ok',
          cssClass: 'primary',
          handler: (data) => {
            this.websocketService.setIp(data.IP);
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  connect(): void {
    this.websocketService.connect();
  }

  onClick(event: any) {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    // console.log(systemDark);
  }

  manageLed(): void {
    this.selectLedService.presentManageLed();
  }
}
