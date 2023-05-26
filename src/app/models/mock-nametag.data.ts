/**
 * This file provides all the fake nametag data we need in our unit
 * tests.
 */
import { Nametag } from "./nametag.model";
import { NametagTemplateSlugDefaults } from "./nametag-templates-default";

export class MockNametagData {
  public static readonly nametag: Nametag = new Nametag( {
    id: "123",
    firstName: "Amanda",
    profession: "Architect",
    isProfessionVisible:true,
    templateSlug: NametagTemplateSlugDefaults.Sleek    
  });

  // Both of these should be unique from the nametag field.
  public static readonly nametags: Nametag[] = [
    new Nametag({
      id: "125",
      firstName: "Hariet",
      profession: "Plumber",
      isProfessionVisible:true,
      templateSlug: NametagTemplateSlugDefaults.Sleek
    }),
    new Nametag({
      id: "199",
      firstName: "Jackson",
      profession: "Developer",
      isProfessionVisible:true,
      templateSlug: NametagTemplateSlugDefaults.Playful
    })
  ];
}
