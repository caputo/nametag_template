import { Component, OnInit } from "@angular/core";
import { NametagTemplate, NametagTemplates } from "../nametag-templates";
import { NametagService } from "../nametag.service";
import { Nametag } from "../nametag.model";
import { NavigationService } from "../../shared/navigation.service";

/**
 * This is the page where a user can create a brand-new
 * nametag by choosing one of the nametag templates. There's
 * no limit on the number of nametags a user is allowed to create.
 */
@Component({
  selector: "app-nametag-create",
  templateUrl: "./nametag-create.component.html",
  styleUrls: ["./nametag-create.component.scss"]
})
export class NametagCreateComponent implements OnInit {
  readonly allNametagTemplates: NametagTemplate[] = NametagTemplates.getAllTemplates();

  constructor(
    private readonly nametag: NametagService,
    private readonly navigation: NavigationService
  ) {}

  ngOnInit(): void {}

  /**
   * Creates a brand new nametag with the given template.
   */
  async createNametag(template: NametagTemplate): Promise<void> {
    let newNametag = new Nametag({ templateSlug: template.slug });
    try {
      // Always use data coming from server over local data.
      newNametag = await this.nametag.createNametag(newNametag);
      await this.navigation.goToNametagEdit(newNametag.id);
    } catch (e) {
      // Strictly for the purposes of this take-home challenge we
      // don't have to worry about error handling (see documentation).
    }
  }
}
