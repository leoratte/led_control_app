import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  getItems(key: string): Promise<any> {
    return this.storage.get(key);
  }

  store(key: string, item: any): void {
    this.storage.set(key, item);
  }
}
