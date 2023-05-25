import { NametagEntity } from "./nametag-entity.model";

export class NametagTemplate implements NametagEntity {
     // The unique ID of a given template that is stored alongside
    // a nametag.
    id:string;
    // The unique ID of a given template that is stored alongside
    // a nametag.
    slug: string;
  
    // The <img src="" ready string that points to an image
    // demonstrating the given template.
    demoImageSrc: string;
  
    // The <img alt="" ready string for the demo image.
    demoImageAlt: string;
  
    //All the style related to the templates theme to be inject
    cssStyle:string;
  
    // The name to be show as example
    sampleName:string;
  
    // The profession to be show as example
    sampleProfession:string;  
  }