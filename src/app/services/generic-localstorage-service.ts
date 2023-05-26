import {Subject} from "rxjs";
import {
  LocalStorageService,
  StorageKey
} from "../services/local-storage.service";
import { NametagEntity } from "../models/nametag-entity.model";

/**
 * This class provides generic implementation to work with CRUD using localStorage
 */
export class GenericLocalStorageService<T extends NametagEntity>{

  /** Subject to notify that the source has changed */
  public dataChanged = new Subject();

  /** Keep cached in memory updating when the subject dataChanged is called */
  private _cachedData:T[];

  constructor(private readonly localStorage: LocalStorageService, 
                private readonly storageKey:StorageKey,
                private readonly duplicateMessage: string,
                private readonly updateNonExistingMessage: string,
                private readonly fetchNonExistingMessage: string,
                 ) {
                  this.dataChanged.subscribe((data:T[])=>{
                    this._cachedData = data;
                  });
                 }

     /**
   * Saves a newly-created entity in the storage layer. Note that
   * the ID for entity should already be set.
   * @param newEntity The entity that exists in memory that
   *                   we want to save to storage.
   */
  async create(newEntity: T): Promise<T> {
    const existingEntities: T[] = await this.list();
    const matchinEntityIndex = existingEntities.findIndex(
      n => n.id === newEntity.id
    );

    // The new nametag shouldn't already exist in the database.
    if (matchinEntityIndex > -1) {
      return Promise.reject(this.duplicateMessage);
    }

    existingEntities.push(newEntity);
    this.saveToStorage(existingEntities);
    //Notify that the data has changed
    this.dataChanged.next(existingEntities);

    return Promise.resolve(newEntity);
  }

  /**
   * Saves the given entity to the storage layer, overwriting whatever
   * data was previously saved for that entity.
   */
  async update(nametag: T): Promise<T> {
    const existingEntities: T[] =  await this.list();
    const matchinEntityIndex = existingEntities.findIndex(
      n => n.id === nametag.id
    );

    // Verify that the entity already exists in the database. You
    // can't update something that doesn't exist.
    if (matchinEntityIndex === -1) {
      return Promise.reject(this.updateNonExistingMessage);
    }

    existingEntities[matchinEntityIndex] = nametag;
    this.saveToStorage(existingEntities);

    //Notify that the data has changed
    this.dataChanged.next(existingEntities);
    return Promise.resolve(nametag);
  }

  /**
   * Loads the entity with the given ID from the storage layer.
   */
  async fetch(entityId: string): Promise<T> {
    const existingEntities: T[] = await this.list();
    const mathingEntityIndex = existingEntities.findIndex(
      n => n.id === entityId
    );
    if (mathingEntityIndex === -1) {
      return Promise.reject(this.fetchNonExistingMessage);
    }

    return existingEntities[mathingEntityIndex];
  }

  /**
   * Loads all the nametags the user has created from the storage layer.
   */
  async list(): Promise<T[]> {
    if(! this._cachedData){
      this._cachedData = this.loadFromStorage();
    }
    this.dataChanged.next(this._cachedData);
    return Promise.resolve(this._cachedData);
  }

  private loadFromStorage(): T[] {
    const entitiesInDb: T[] = this.localStorage.loadData(
      this.storageKey,
      []
    );   
    return entitiesInDb;    
  }

  private saveToStorage(entities: T[]) {
    this.localStorage.saveData(this.storageKey, entities);
  }
}