import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { NametagTemplate } from "src/app/models/nametag-template.model";
import { NametagTemplatesService } from "src/app/services/nametag-templates.service";

/**
 * Pulls the template id from the route params and returns a full-fledged
 * Nametag object. Normally we'd avoid resolvers altogether, but it
 * simplifies the implementation for any controller that uses it.
 */
@Injectable({
  providedIn: "root"
})
export class TemplateEditResolver implements Resolve<NametagTemplate> {
  constructor(private readonly nametagService: NametagTemplatesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<NametagTemplate> {
    const templateId: string = route.params.templateId;
    return this.nametagService.fetch(templateId);
  }
}
