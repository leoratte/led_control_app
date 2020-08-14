import { Component , OnInit} from '@angular/core';

import { Platform, AlertController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { WebsocketService } from './services/websocket.service';
import { SelectLedService } from './services/select-led.service';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertCtrl: AlertController,
    private websocketService: WebsocketService,
    private selectLedService: SelectLedService
  ) {
    this.initializeApp();
  }

  initializeApp(): void {
    this.splashScreen.hide();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(): void {}
}
