import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { AlertController } from '@ionic/angular';

const IP_KEY = 'ip';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private ip: string;
  private ws: WebSocket;

  constructor(
    private alertCtrl: AlertController,
    private storageService: StorageService
    ) {
    this.loadIp();
  }

  connect(): void {
    const url = 'ws://' + this.ip + ':6789';
    this.ws = new WebSocket(url);
  }

  setIp(ip: string): void {
    this.ip = ip;
    this.connect();
    this.saveIp();
  }

  isConnected(): boolean {
    console.log(this.ws.readyState);
    return this.ws.readyState === 1;
  }

  getIp(): string {
    return this.ip;
  }

  saveIp(): void {
    this.storageService.store(IP_KEY, this.ip);
  }

  send(message: any): void {
    if(!this.isConnected()){
      this.connect();
    }
    this.ws.send(JSON.stringify(message));
  }

  loadIp(): void {
    this.storageService.load(IP_KEY).then((ip: string) => {
      if(ip != null){
        this.ip = ip;
        this.connect();
      } else {
        this.presentChangeIp();
      }
    });
  }

  presentChangeIp(): void {
    this.alertCtrl.create({
      header: 'Enter IP',
      inputs: [
        {
          name: 'IP',
          value: this.ip,
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
            this.setIp(data.IP);
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }
}
