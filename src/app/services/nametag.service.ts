import { Injectable } from "@angular/core";
import { Nametag, SerializedNametag } from "../models/nametag.model";
import { AppMessagesDefault } from "../shared/error-messages";
import {
  LocalStorageService,
  StorageKey
} from "../services/local-storage.service";
import { GenericLocalStorageService } from "./generic-localstorage-service";

/**
 * Handles all interactions between nametags and the storage layer. Normally
 * we'd use HTTP-based API calls to an API server, but for simplicity we
 * just use local storage instead.
 */
@Injectable({
  providedIn: "root"
})
export class NametagService extends GenericLocalStorageService<SerializedNametag> {
  constructor(private readonly localStorageService: LocalStorageService) {
    super(localStorageService,
      StorageKey.Nametags,
      AppMessagesDefault.CREATE_DUPLICATE_NAMETAG,
      AppMessagesDefault.UPDATE_NONEXISTENT_NAMETAG,
      AppMessagesDefault.FETCH_NONEXISTENT_NAMETAG);
  }

  /**
   * Saves a newly-created nametag in the storage layer. Note that
   * the ID for newNametag should already be set.
   * @param newNametag The nametag that exists in memory that
   *                   we want to save to storage.
   */
  async createNametag(newNametag: Nametag): Promise<Nametag> {
    return super.create(newNametag.serialize()).then((data)=>new Nametag(data));    
  }

  /**
   * Saves the given nametag to the storage layer, overwriting whatever
   * data was previously saved for that nametag.
   */
  async updateNametag(nametag: Nametag): Promise<Nametag> {
    return super.update(nametag.serialize()).then((data)=>new Nametag(data));    
  }

  /**
   * Loads the nametag with the given ID from the storage layer.
   */
  async fetchNametag(nametagId: string): Promise<Nametag> {
    return super.fetch(nametagId).then((data)=>new Nametag(data));    
  }

  /**
   * Loads all the nametags the user has created from the storage layer.
   */
  async listNametags(): Promise<Nametag[]> {
    return Promise.resolve((await super.list()).map(serializedNametag=> new Nametag(serializedNametag)));
  }
}
