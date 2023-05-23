import { Injectable } from "@angular/core";

/**
 * Abstracts away having to deal with local storage directly.
 * Introducing this service simplifies testing for anything
 * that uses it.
 */

// Local storage operates with key-value pairs. Centralize all the
// key names we might use.
export enum StorageKey {
  Nametags = "nametags"
}

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  constructor() {}

  /**
   * Loads data with the given key from storage. If no data exists,
   * then return the defaultVal.
   */
  loadData(key: StorageKey, defaultVal = null): any {
    const savedVal = localStorage.getItem(key);
    if (!savedVal) {
      return defaultVal;
    }

    // We can only store strings in local storage, but we'd like
    // to make it seem like we can store actual objects. So we
    // stringify on save and parse on load.
    return JSON.parse(savedVal);
  }

  /**
   * Saves the given value to storage under the given key.
   */
  saveData(key: StorageKey, val: any): void {
    // We can only store strings in local storage, but we'd like
    // to make it seem like we can store actual objects. So we
    // stringify on save and parse on load.
    localStorage.setItem(key, JSON.stringify(val));
  }
}
