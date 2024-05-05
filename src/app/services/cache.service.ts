import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, any>();

  constructor() { }

  getData(key: string): any {
    return this.cache.get(key);
  }

  setData(key: string, data: any): void {
    this.cache.set(key, data);
  }

  clearCache(): void {
    this.cache.clear();
  }
}
