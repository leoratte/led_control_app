import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

const DARKMODE_KEY = 'darkmode';
@Component({
  selector: 'app-darkmode-toggle',
  templateUrl: './darkmode-toggle.component.html',
  styleUrls: ['./darkmode-toggle.component.scss'],
})
export class DarkmodeToggleComponent implements OnInit {
  public darkmode: boolean;
  constructor(
    private storageService: StorageService
  ) {
    this.load();
  }

  ngOnInit() {}

  load(): void {
    this.storageService
    .load(DARKMODE_KEY)
    .then((darkmode: boolean) =>{
      if(darkmode != null) {
        this.darkmode = darkmode;
      } else {
         this.darkmode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      this.apply();
    });
  }

  storeDarkmode(): void {
    this.storageService.store(DARKMODE_KEY, this.darkmode);
  }

  update(darkmode: boolean): void {
    this.darkmode = darkmode;
    this.storeDarkmode();
    this.apply();
  }

  apply(): void {
    if(this.darkmode){
      document.body.setAttribute('data-theme', 'dark');
    }
    else{
      document.body.setAttribute('data-theme', 'light');
    }
  }
}
