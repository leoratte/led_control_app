import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

const IP_KEY = 'ip';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private ip: string;
  private ws: WebSocket;

  constructor(private storageService: StorageService) {
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

  getIp(): string {
    return this.ip;
  }

  saveIp(): void {
    this.storageService.store(IP_KEY, this.ip);
  }

  send(message: any): void {
    this.ws.send(JSON.stringify(message));
  }

  loadIp(): void {
    this.storageService.getItems(IP_KEY).then((ip: string) => {
      this.ip = ip;
      this.connect();
    });
  }
}
