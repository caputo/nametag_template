import { PageSpec } from "../../shared/page.spec";
import { ComponentFixture } from "@angular/core/testing";
import { NametagEditComponent } from "./nametag-edit.component";

export class NametagEditComponentPageSpec extends PageSpec<
  NametagEditComponent
> {
  constructor(someFixture: ComponentFixture<NametagEditComponent>) {
    super(someFixture);
  }
}
