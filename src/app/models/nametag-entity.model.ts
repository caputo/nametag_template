
/** This interface is dedicated to entities that will be stored and implemented with the GenericService */

export interface NametagEntity{
    // The unique ID that identified this nametag. Note that
  // we treat this as the primary key in the storage layer.
    id:string;
}