import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { NametagService } from "../nametag.service";
import { Nametag } from "../nametag.model";

/**
 * Pulls the nametagId from the route params and returns a full-fledged
 * Nametag object. Normally we'd avoid resolvers altogether, but it
 * simplifies the implementation for any controller that uses it.
 */
@Injectable({
  providedIn: "root"
})
export class NametagResolver implements Resolve<Nametag> {
  constructor(private readonly nametagService: NametagService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Nametag> {
    const nametagId: string = route.params.nametagId;
    return this.nametagService.fetchNametag(nametagId);
  }
}
