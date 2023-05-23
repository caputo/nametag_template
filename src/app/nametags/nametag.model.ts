import {
  NametagTemplate,
  NametagTemplates,
  NametagTemplateSlug
} from "./nametag-templates";

/**
 * A JSON, HTTP-friendly representation of a nametag.
 */
export interface SerializedNametag {
  // The unique ID that identified this nametag. Note that
  // we treat this as the primary key in the storage layer.
  id: string;

  // The first name of the person wearing the nametag. For our
  // purposes we don't display last names.
  firstName: string;

  // The profession of the person wearing the nametag.
  profession: string;

  // The unique ID that identifies which nametag template the
  // user wants.
  templateSlug: NametagTemplateSlug;
}

export class Nametag implements SerializedNametag {
  id: string;
  firstName: string;
  profession: string;
  templateSlug: NametagTemplateSlug;

  // Take the templateSlug (the source of truth) and get all the other
  // data associated with that template.
  get template() {
    return NametagTemplates.getTemplateWithSlug(this.templateSlug);
  }

  set template(newTemplate: NametagTemplate) {
    this.templateSlug = newTemplate.slug;
  }

  constructor(rawData: Partial<SerializedNametag>) {
    // If a property is defined in rawData, then use that. Otherwise,
    // use the default value for that property.
    Object.assign(this, this.getDefaultSerializedValues(), rawData);
  }

  /**
   * Converts this object into something that can be stored in the
   * storage layer.
   */
  serialize(): SerializedNametag {
    return {
      id: this.id,
      firstName: this.firstName,
      profession: this.profession,
      templateSlug: this.template.slug
    };
  }

  /**
   * Creates a brand-new object containing all the default values
   * for a SerializedNametag. We use a method instead
   * of just storing a static object so that we can modify the
   * result without changing anything for future callers.
   */
  private getDefaultSerializedValues(): SerializedNametag {
    return {
      // Assume we can't create 2 nametags in the same ms, which means
      // each ID will be unique.
      id: Date.now().toString(),
      firstName: "",
      profession: "",
      templateSlug: NametagTemplateSlug.Sleek
    };
  }
}
