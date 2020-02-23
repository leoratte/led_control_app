import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  private colors: string[] = [
    '#121212',
    '#f0f0f0',
    '#ff0000'
  ];

  constructor() { }

  getAllColors() {
    return [...this.colors];
  }

  addColor(color: string) {
    this.colors.push(color);
    // console.log(this.colors);
  }
}
