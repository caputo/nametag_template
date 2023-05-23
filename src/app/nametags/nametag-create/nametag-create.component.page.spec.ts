import { PageSpec } from "../../shared/page.spec";
import { ComponentFixture } from "@angular/core/testing";
import { NametagCreateComponent } from "./nametag-create.component";
import { NametagTemplates, NametagTemplateSlug } from "../nametag-templates";

export class NametagCreateComponentPageSpec extends PageSpec<
  NametagCreateComponent
> {
  /**
   * Gets the "src" attribute for a demo image of the given
   * template.
   */
  private static getTemplateDemoImgSrc(templateSlug: NametagTemplateSlug) {
    return NametagTemplates.getTemplateWithSlug(templateSlug).demoImageSrc;
  }

  get sleekTemplateImage(): HTMLImageElement {
    const demoSrcId = NametagCreateComponentPageSpec.getTemplateDemoImgSrc(
      NametagTemplateSlug.Sleek
    );
    return this.query<HTMLImageElement>(`img[src="${demoSrcId}"]`);
  }

  get playfulTemplateImage(): HTMLImageElement {
    const demoSrcId = NametagCreateComponentPageSpec.getTemplateDemoImgSrc(
      NametagTemplateSlug.Playful
    );
    return this.query<HTMLImageElement>(`img[src="${demoSrcId}"]`);
  }

  constructor(someFixture: ComponentFixture<NametagCreateComponent>) {
    super(someFixture);
  }
}
