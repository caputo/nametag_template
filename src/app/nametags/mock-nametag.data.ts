/**
 * This file provides all the fake nametag data we need in our unit
 * tests.
 */
import { Nametag } from "./nametag.model";
import { NametagTemplateSlug } from "./nametag-templates";

export class MockNametagData {
  public static readonly nametag: Nametag = new Nametag({
    id: "123",
    firstName: "Amanda",
    profession: "Architect",
    templateSlug: NametagTemplateSlug.Sleek
  });

  // Both of these should be unique from the nametag field.
  public static readonly nametags: Nametag[] = [
    new Nametag({
      id: "125",
      firstName: "Hariet",
      profession: "Plumber",
      templateSlug: NametagTemplateSlug.Sleek
    }),
    new Nametag({
      id: "199",
      firstName: "Jackson",
      profession: "Developer",
      templateSlug: NametagTemplateSlug.Playful
    })
  ];
}
