export interface NametagTemplate {
  // The unique ID of a given template that is stored alongside
  // a nametag.
  slug: NametagTemplateSlug;

  // The <img src="" ready string that points to an image
  // demonstrating the given template.
  demoImageSrc: string;

  // The <img alt="" ready string for the demo image.
  demoImageAlt: string;

  //All the style related to the templates theme to be inject
  cssStyle:string;
}

export enum NametagTemplateSlug {
  Sleek = "Sleek",
  Playful = "Playful"
}

export class NametagTemplates {
  public static SLEEK: NametagTemplate = {
    slug: NametagTemplateSlug.Sleek,
    demoImageSrc: "assets/images/sleek_template.png",
    demoImageAlt: "Sleek nametag template",
    cssStyle: ` 
    .nametag-edit{        
      background-color: black;    
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }    
  .name-input{
      font-size: 70px;
      letter-spacing: 11px;
      font-weight: 600;
      height: 72px;
      font-family: "Overpass";
      text-transform: uppercase;
  }
  .profession-input{
      font-size: 23px;
      letter-spacing: 3px;
      font-family: "Overpass";
      text-transform: uppercase;
      font-weight: 300;
  }`
  };
  public static PLAYFUL: NametagTemplate = {
    slug: NametagTemplateSlug.Playful,
    demoImageSrc: "assets/images/playful_template.png",
    demoImageAlt: "Playful nametag template",
    cssStyle:`.nametag-edit{
                    background-color: white;
                    color: black;
                }

                .nametag-header{ 
                    height: 35px;
                    background-color: #ffcfd1;        
                }
                .nametag-footer{
                    height: 35px;        
                    background-color:#ffcfd1;
                }    
                .name-input{
                    font-size: 70px;
                    letter-spacing: 11px;
                    font-weight: 600;
                    height: 72px;
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

  static getAllTemplates(): NametagTemplate[] {
    return [NametagTemplates.SLEEK, NametagTemplates.PLAYFUL];
  }

  static getTemplateWithSlug(slug: NametagTemplateSlug) {
    return this.getAllTemplates().find(t => t.slug === slug);
  }
}
