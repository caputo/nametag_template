import { Injectable } from "@angular/core";
import { Nametag, SerializedNametag } from "./nametag.model";
import { ErrorMessages } from "../shared/error-messages";
import {
  LocalStorageService,
  StorageKey
} from "../shared/local-storage.service";

/**
 * Handles all interactions between nametags and the storage layer. Normally
 * we'd use HTTP-based API calls to an API server, but for simplicity we
 * just use local storage instead.
 */
@Injectable({
  providedIn: "root"
})
export class NametagService {
  constructor(private readonly localStorage: LocalStorageService) {}

  /**
   * Saves a newly-created nametag in the storage layer. Note that
   * the ID for newNametag should already be set.
   * @param newNametag The nametag that exists in memory that
   *                   we want to save to storage.
   */
  async createNametag(newNametag: Nametag): Promise<Nametag> {
    const existingNametags: Nametag[] = this.loadNametagsFromStorage();
    const matchingNametagIndex = existingNametags.findIndex(
      n => n.id === newNametag.id
    );

    // The new nametag shouldn't already exist in the database.
    if (matchingNametagIndex > -1) {
      return Promise.reject(ErrorMessages.CREATE_DUPLICATE_NAMETAG);
    }

    existingNametags.push(newNametag);
    this.saveNametagsToStorage(existingNametags);

    return Promise.resolve(newNametag);
  }

  /**
   * Saves the given nametag to the storage layer, overwriting whatever
   * data was previously saved for that nametag.
   */
  async updateNametag(nametag: Nametag): Promise<Nametag> {
    const existingNametags: Nametag[] = this.loadNametagsFromStorage();
    const matchingNametagIndex = existingNametags.findIndex(
      n => n.id === nametag.id
    );

    // Verify that the nametag already exists in the database. You
    // can't update something that doesn't exist.
    if (matchingNametagIndex === -1) {
      return Promise.reject(ErrorMessages.UPDATE_NONEXISTENT_NAMETAG);
    }

    existingNametags[matchingNametagIndex] = nametag;
    this.saveNametagsToStorage(existingNametags);

    return Promise.resolve(nametag);
  }

  /**
   * Loads the nametag with the given ID from the storage layer.
   */
  async fetchNametag(nametagId: string): Promise<Nametag> {
    const existingNametags: Nametag[] = this.loadNametagsFromStorage();
    const matchingNametagIndex = existingNametags.findIndex(
      n => n.id === nametagId
    );
    if (matchingNametagIndex === -1) {
      return Promise.reject(ErrorMessages.FETCH_NONEXISTENT_NAMETAG);
    }

    return existingNametags[matchingNametagIndex];
  }

  /**
   * Loads all the nametags the user has created from the storage layer.
   */
  async listNametags(): Promise<Nametag[]> {
    return Promise.resolve(this.loadNametagsFromStorage());
  }

  private loadNametagsFromStorage(): Nametag[] {
    const nametagsInDb: SerializedNametag[] = this.localStorage.loadData(
      StorageKey.Nametags,
      []
    );
    return nametagsInDb.map((serializedNametag: SerializedNametag) => {
      return new Nametag(serializedNametag);
    });
  }

  private saveNametagsToStorage(nametags: Nametag[]) {
    const newNametagsInDb: SerializedNametag[] = nametags.map(nametag =>
      nametag.serialize()
    );

    this.localStorage.saveData(StorageKey.Nametags, newNametagsInDb);
  }
}
