export interface NametagTemplate {
  // The unique ID of a given template that is stored alongside
  // a nametag.
  slug: NametagTemplateSlug;

  // The <img src="" ready string that points to an image
  // demonstrating the given template.
  demoImageSrc: string;

  // The <img alt="" ready string for the demo image.
  demoImageAlt: string;
}

export enum NametagTemplateSlug {
  Sleek = "Sleek",
  Playful = "Playful"
}

export class NametagTemplates {
  public static SLEEK: NametagTemplate = {
    slug: NametagTemplateSlug.Sleek,
    demoImageSrc: "assets/images/sleek_template.png",
    demoImageAlt: "Sleek nametag template"
  };
  public static PLAYFUL: NametagTemplate = {
    slug: NametagTemplateSlug.Playful,
    demoImageSrc: "assets/images/playful_template.png",
    demoImageAlt: "Playful nametag template"
  };

  static getAllTemplates(): NametagTemplate[] {
    return [NametagTemplates.SLEEK, NametagTemplates.PLAYFUL];
  }

  static getTemplateWithSlug(slug: NametagTemplateSlug) {
    return this.getAllTemplates().find(t => t.slug === slug);
  }
}
