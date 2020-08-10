import { Component } from '@angular/core';
import { Led } from 'src/app/services/select-led.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-manage-led',
  templateUrl: './manage-led.component.html',
  styleUrls: ['./manage-led.component.scss'],
})
export class ManageLedComponent {
  public ledmap: Led[];
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
    ) { }

ionViewWillEnter() {
  this.ledmap = this.navParams.get('ledmap');
}

async cancel() {
  await this.modalCtrl.dismiss();
}

async apply() {
  await this.modalCtrl.dismiss(this.ledmap);
}
}
