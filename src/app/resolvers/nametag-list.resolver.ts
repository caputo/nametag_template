import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { NametagService } from "../services/nametag.service";
import { Nametag } from "../models/nametag.model";
import { NametagTemplate } from "src/app/models/nametag-template.model";
import { NametagTemplatesService } from "src/app/services/nametag-templates.service";

/**
 * Fetches all the Nametags and Templates that the user has created. Normally we'd avoid
 * resolvers altogether, but it simplifies the implementation for any
 * controller that uses it.
 */
@Injectable({
  providedIn: "root"
})
export class NametagListResolver implements Resolve<[NametagTemplate[],Nametag[]]> {
  constructor(private readonly nametagService: NametagService,
    private readonly templateServices:NametagTemplatesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<[NametagTemplate[],Nametag[]]> {    
    return Promise.all([this.templateServices.list(),this.nametagService.listNametags()]);    
  }
}
