import { Component, OnInit } from '@angular/core';

import { WebsocketService } from '../../services/websocket.service';
import { SelectLedService } from '../../services/select-led.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    private websocketService: WebsocketService,
    private selectLedService: SelectLedService) { }

  ngOnInit() {}

  changeIp(): void {
    this.websocketService.presentChangeIp()
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
