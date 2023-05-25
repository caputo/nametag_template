import { NametagTemplate } from "./nametag-template.model";

export enum NametagTemplateSlugDefaults {
  Sleek = "Sleek",
  Playful = "Playful"
}

/** This class provides the initial templates and the default style to create new templates */
export class NametagTemplatesDefault {

  /** The default css for new templates */
  public static ClearCSS: string = `
    .nametag-edit-background{
      background-color: #c5c5c5;
      color: black;
      border-top-width:0px;
      border-bottom-width:0px;
      border-left-width:0px;
      border-right-width:0px;
      border-color: #000000;
    }   
    .name-input{
        font-size: 70px;
        letter-spacing: 11px;
        font-weight: 600;
        height: 72px;
        font-family: "Arial";
        color: black;            
    }
    .profession-input{
        font-size: 23px;
        letter-spacing: 3px;
        font-weight: 300;
        font-family: "Arial";
        color:black;
        text-transform: uppercase;
    }`;

  public static SLEEK: NametagTemplate = {
    id:NametagTemplateSlugDefaults.Sleek,
    slug: NametagTemplateSlugDefaults.Sleek,
    sampleName: "ADDALEE",
    sampleProfession: "Software Engineer",
    demoImageSrc: "assets/images/sleek_template.png",
    demoImageAlt: "Sleek nametag template",
    cssStyle: ` 
    .nametag-edit-background{        
      background-color: black;
    }    
  .name-input{
      font-size: 70px;
      padding:0px;
      height:70px;
      letter-spacing: 11px;
      color: white;
      font-weight: 600;      
      font-family: "Overpass";
      text-transform: uppercase;
  }
  .profession-input{  
      padding:0px;    
      font-size: 23px;
      letter-spacing: 3px;
      font-family: "Overpass";
      color: white;
      text-transform: uppercase;
      font-weight: 300;
  }`
  };
  public static PLAYFUL: NametagTemplate = {
    id: NametagTemplateSlugDefaults.Playful,
    slug: NametagTemplateSlugDefaults.Playful,
    demoImageSrc: "assets/images/playful_template.png",
    demoImageAlt: "Playful nametag template",
    sampleName: "Felix",
    sampleProfession: "Architect",
    cssStyle:` .nametag-edit-background{
                    background-color: white;                    
                    border-top-color: #ffcfd1;
                    border-top-width: 35px;
                    border-bottom-color: #ffcfd1;                    
                    border-bottom-width: 35px;
                }           
                .name-input{
                    font-size: 72px;
                    letter-spacing: 11px;
                    font-weight: 600;                    
                    font-family: "Fredoka One";
                    color: black;            
                }
                .profession-input{
                    font-size: 23px;
                    letter-spacing: 3px;
                    font-weight: 300;
                    font-family: "Fredoka One";
                    color:black;
                    text-transform: uppercase;
            }`
  };

  /**Return the default templates */
  static getAllTemplates(): NametagTemplate[] {
    return [NametagTemplatesDefault.SLEEK, NametagTemplatesDefault.PLAYFUL];
  }

}
