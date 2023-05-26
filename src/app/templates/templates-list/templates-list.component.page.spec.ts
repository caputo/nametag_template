import { PageSpec } from "../../shared/page.spec";
import { ComponentFixture } from "@angular/core/testing";
import { TemplatesListComponent } from "./templates-list.component";

export class TemplatesListComponentPageSpec extends PageSpec<
TemplatesListComponent
> {
  constructor(someFixture: ComponentFixture<TemplatesListComponent>) {
    super(someFixture);
  }

  get getLinks():HTMLDivElement[]{
    return this.queryAll<HTMLDivElement>(`.templateLink`);
  }
}
