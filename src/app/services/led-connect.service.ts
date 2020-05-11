import { Injectable } from '@angular/core';

import { WebsocketService } from './websocket.service';
import { SelectLedService } from './select-led.service';

@Injectable({
  providedIn: 'root'
})
export class LedConnectService {

  constructor(
    private websocketService: WebsocketService,
    private selectLedService: SelectLedService) {
  }

  sendStatic(sendColor: string): void {
    const msg = {
      name: this.selectLedService.getLed(),
      type: 'static',
      color: sendColor
    };
    this.websocketService.send(msg);
  }

  sendAnimation(animation: string, speed: number): void {
    const msg = {
      name: this.selectLedService.getLed(),
      type: 'animation',
      animationType: animation,
      animationSpeed: speed
    };
    this.websocketService.send(msg);
  }

  sendCustomAnimation(steps: any[]): void {
    const msg = {
      name: this.selectLedService.getLed(),
      type: 'animation',
      animationType: 'custom',
      animationSteps: steps,
      speed: 1
    };
    this.websocketService.send(msg);
  }
}
