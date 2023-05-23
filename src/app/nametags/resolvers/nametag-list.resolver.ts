import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { NametagService } from "../nametag.service";
import { Nametag } from "../nametag.model";

/**
 * Fetches all the Nametags that the user has created. Normally we'd avoid
 * resolvers altogether, but it simplifies the implementation for any
 * controller that uses it.
 */
@Injectable({
  providedIn: "root"
})
export class NametagListResolver implements Resolve<Nametag[]> {
  constructor(private readonly nametagService: NametagService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Nametag[]> {
    return this.nametagService.listNametags();
  }
}
