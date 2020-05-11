import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { LedConnectService } from './led-connect.service';

export interface Animation {
  name: string;
  type: string;
}

export interface StandardAnimation extends Animation {
  code: string;
}

export interface CustomAnimation extends Animation {
  steps: AnimationStep[];
}

export interface AnimationStep {
  id: number;
  startColor: string;
  endColor: string;
  duration: number;
}

const ANIMATION_KEY = 'animations';
const FAV_ANIMATION_KEY = 'favAnimations';
const CUSTOM_ANIMATION_KEY = 'customAnimations';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  private animations: StandardAnimation[] = [
    { name: 'Stop', type: 'standard', code: 'stop' },
    { name: 'Random', type: 'standard', code: 'random' },
    { name: 'Breathing', type: 'standard', code: 'breathing' },
    { name: 'Colorcircle', type: 'standard', code: 'colorcircle' },
    { name: 'Random Breathing', type: 'standard', code: 'randombreathing' },
    { name: 'Colorcircle Breathing', type: 'standard', code: 'colorcirclebreathing' }
  ];
  private favAnimations: Animation[] = [];
  private customAnimations: CustomAnimation[] = [];

  constructor(
    private storageService: StorageService,
    private ledConnection: LedConnectService
  ) {
    this.loadAnimations();
    this.loadFavAnimations();
    this.loadCustomAnimations();
  }

  // animation
  getAllAnimations(): Animation[] {
    return this.animations;
  }

  addAnimation(animation: StandardAnimation): void {
    if (this.animations.find(e => e.name === animation.name) === undefined) {
      this.animations.push(animation);
      this.storeAnimations();
    }
  }

  reorderAnimations(from: number, to: number): void {
    const animation = this.animations[from];
    this.animations.splice(from, 1);
    this.animations.splice(to, 0, animation);
    this.storeAnimations();
  }

  storeAnimations(): void {
    this.storageService.store(ANIMATION_KEY, this.animations);
  }

  loadAnimations(): void {
    this.storageService
      .getItems(ANIMATION_KEY)
      .then((animations: StandardAnimation[]) => {
        if (animations != null) {
          for (const iterator of animations) {
            this.addAnimation(iterator);
          }
        }
      });
  }

  sendAnimation(animation: Animation, speed: number): void {
    if (animation.type === 'standard') {
      this.ledConnection.sendAnimation((animation as StandardAnimation).code, speed);
    } else if(animation.type === 'custom') {
      this.ledConnection.sendCustomAnimation((animation as CustomAnimation).steps);
    }
  }

  // fav animation
  getAllFavAnimations(): Animation[] {
    return this.favAnimations;
  }

  addFavAnimation(animation: Animation): void {
    if (this.favAnimations.find(e => e.name === animation.name) === undefined) {
      this.favAnimations.push(animation);
      this.storeFavAnimations();
    }
  }

  reorderFavAnimations(from: number, to: number): void {
    const animation = this.favAnimations[from];
    this.favAnimations.splice(from, 1);
    this.favAnimations.splice(to, 0, animation);
    this.storeFavAnimations();
  }

  removeFavorite(animation: Animation): void {
    const index = this.favAnimations.indexOf(animation);
    this.favAnimations.splice(index, 1);
    this.storeFavAnimations();
  }

  storeFavAnimations(): void {
    this.storageService.store(FAV_ANIMATION_KEY, this.favAnimations);
  }

  loadFavAnimations(): void {
    this.storageService
      .getItems(FAV_ANIMATION_KEY)
      .then((animations: Animation[]) => {
        if (animations != null) {
          for (const iterator of animations) {
            this.addFavAnimation(iterator);
          }
        }
      });
  }

  // custom animation
  getAllCustomAnimations(): CustomAnimation[] {
    return this.customAnimations;
  }

  addCustomAnimation(animation: CustomAnimation): boolean {
    if (this.customAnimations.find(e => e.name === animation.name) === undefined) {
      this.customAnimations.push(animation);
      this.storeCustomAnimations();
      return true;
    } else {
      return false;
    }
  }

  reorderCustomAnimations(from: number, to: number): void {
    const animation = this.customAnimations[from];
    this.customAnimations.splice(from, 1);
    this.customAnimations.splice(to, 0, animation);
    this.storeCustomAnimations();
  }

  removeCustom(animation: CustomAnimation): void {
    const index = this.customAnimations.indexOf(animation);
    this.customAnimations.splice(index, 1);
    this.storeCustomAnimations();
  }

  storeCustomAnimations(): void {
    this.storageService.store(CUSTOM_ANIMATION_KEY, this.customAnimations);
  }

  loadCustomAnimations(): void {
    this.storageService
      .getItems(CUSTOM_ANIMATION_KEY)
      .then((animations: CustomAnimation[]) => {
        if (animations != null) {
          for (const iterator of animations) {
            this.addCustomAnimation(iterator);
          }
        }
      });
  }
}
