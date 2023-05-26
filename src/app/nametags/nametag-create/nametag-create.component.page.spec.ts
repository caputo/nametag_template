import { PageSpec } from "../../shared/page.spec";
import { ComponentFixture } from "@angular/core/testing";
import { NametagCreateComponent } from "./nametag-create.component";
import { NametagTemplatesDefault, NametagTemplateSlugDefaults } from "../../models/nametag-templates-default";

export class NametagCreateComponentPageSpec extends PageSpec<NametagCreateComponent> {

  get sleekTemplateImage(): HTMLImageElement {
    const demoSrcId = NametagTemplatesDefault.SLEEK.demoImageSrc;
    return this.query<HTMLImageElement>(`img[src="${demoSrcId}"]`);
  }

  get sleekTemplateLink(): HTMLLinkElement {
    return this.query<HTMLLinkElement>(`#nametagTemplate-${NametagTemplatesDefault.SLEEK.slug}`)
  }

  get playfulTemplateImage(): HTMLImageElement {
    const demoSrcId = NametagTemplatesDefault.PLAYFUL.demoImageSrc;
    return this.query<HTMLImageElement>(`img[src="${demoSrcId}"]`);
  }
  get playfullTemplateLink(): HTMLLinkElement {
    return this.query<HTMLLinkElement>(`#nametagTemplate-${NametagTemplatesDefault.PLAYFUL.slug}`)
  }

  constructor(someFixture: ComponentFixture<NametagCreateComponent>) {
    super(someFixture);
  }
}
