import { PageSpec } from "../../shared/page.spec";
import { ComponentFixture } from "@angular/core/testing";
import { NametagListComponent } from "./nametag-list.component";

export class NametagListComponentPageSpec extends PageSpec<
  NametagListComponent
> {
  get nametags(): HTMLLinkElement[] {
    return this.queryAll<HTMLLinkElement>("a");
  }

  constructor(someFixture: ComponentFixture<NametagListComponent>) {
    super(someFixture);
  }
}
