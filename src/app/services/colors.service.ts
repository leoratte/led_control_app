import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { LedConnectService } from './led-connect.service';

const COLOR_KEY = 'colors';
@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  private colors: string[] = [];

  constructor(
    private storageService: StorageService,
    private ledConnection: LedConnectService
  ) {
    this.load();
  }

  getAllColors(): string[] {
    return this.colors;
  }

  addColor(color: string): void {
    if (!this.colors.includes(color)) {
      this.colors.push(color);
    }
    this.storeColors();
  }

  deleteColor(color: string): void {
    const index = this.colors.indexOf(color);
    this.colors.splice(index, 1);
    this.storeColors();
  }

  reorderColors(from: number, to: number): void {
    const color = this.colors[from];
    this.colors.splice(from, 1);
    this.colors.splice(to, 0, color);
    this.storeColors();
  }

  load(): void {
    this.storageService.getItems(COLOR_KEY).then((colors: string[]) => {
      for (const iterator of colors) {
        this.addColor(iterator);
      }
    });
  }

  storeColors(): void {
    this.storageService.store(COLOR_KEY, this.colors);
  }

  sendColor(color: string): void {
    this.ledConnection.sendStatic(color.substring(1, 7));
  }
}
