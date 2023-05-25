import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { NametagTemplatesService } from "src/app/services/nametag-templates.service";
import { NametagTemplate } from "src/app/models/nametag-template.model";

/**
 * Fetches all the templates that the user has created. Normally we'd avoid
 * resolvers altogether, but it simplifies the implementation for any
 * controller that uses it.
 */
@Injectable({
  providedIn: "root"
})
export class TemplatesListResolver implements Resolve<NametagTemplate[]> {
  constructor(private readonly nametagTemplatesService: NametagTemplatesService) {}


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<NametagTemplate[]> {
    return this.nametagTemplatesService.list();
  }
}
