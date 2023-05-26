import { NametagTemplatesService } from "../services/nametag-templates.service";
import { NametagEntity } from "./nametag-entity.model";
import { NametagTemplate } from "./nametag-template.model";
import {  
  NametagTemplateSlugDefaults,
  NametagTemplatesDefault  
} from "./nametag-templates-default";

/**
 * A JSON, HTTP-friendly representation of a nametag.
 */
export interface SerializedNametag extends NametagEntity {
  // The first name of the person wearing the nametag. For our
  // purposes we don't display last names.
  firstName: string;

  // The profession of the person wearing the nametag.
  profession: string;

  // The unique ID that identifies which nametag template the
  // user wants.
  templateSlug: string;

  //Indicates if the profission is visible in the nametag
  isProfessionVisible:boolean;
}



/** Class related to the nametag
 * contains the relation with the template and can implement others verifications
 */
export class Nametag implements SerializedNametag {
  id: string;
  firstName: string;
  profession: string;
  templateSlug: string;
  template:NametagTemplate;
  isProfessionVisible:boolean;
  
  
  constructor(rawData: Partial<SerializedNametag>) {
    // If a property is defined in rawData, then use that. Otherwise,
    // use the default value for that property.
    Object.assign(this, this.getDefaultSerializedValues(), rawData);

    this.template = NametagTemplatesService.getTemplateWithSlug(this.templateSlug);
  }

  /**
   * Converts this object into something that can be stored in the
   * storage layer.
   */
  public serialize(): SerializedNametag {
    return {
      id: this.id,
      firstName: this.firstName,
      profession: this.profession,
      templateSlug: this.templateSlug,
      isProfessionVisible:this.isProfessionVisible
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
      isProfessionVisible:true,
      templateSlug: NametagTemplateSlugDefaults.Sleek
    };
  }
}
