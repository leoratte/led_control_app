import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../colors/colors.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  favColors: string[];

  constructor(private colors: ColorsService) {}

  ngOnInit(): void {
    this.favColors = this.colors.getAllColors();
    console.log(this.favColors);
  }
}
