import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { NametagService } from "../../services/nametag.service";
import { Nametag } from "../../models/nametag.model";
import { NametagTemplate } from "src/app/models/nametag-template.model";
import { NametagTemplatesService } from "src/app/services/nametag-templates.service";

/**
 * Pulls the nametagId from the route params and returns a full-fledged
 * Nametag object. Normally we'd avoid resolvers altogether, but it
 * simplifies the implementation for any controller that uses it.
 */
@Injectable({
  providedIn: "root"
})
export class NametagResolver implements Resolve<[NametagTemplate[],Nametag]> {
  constructor(private readonly nametagService: NametagService,
              private readonly templatesServices: NametagTemplatesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<[NametagTemplate[],Nametag]> {
    const nametagId: string = route.params.nametagId;
    return Promise.all([this.templatesServices.list(),this.nametagService.fetchNametag(nametagId)]);    
  }
}
