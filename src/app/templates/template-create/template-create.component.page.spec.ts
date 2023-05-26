import { PageSpec } from "../../shared/page.spec";
import { ComponentFixture } from "@angular/core/testing";
import { TemplateCreateComponent } from "./template-create.component";

export class TemplateCreateComponentPageSpec extends PageSpec<TemplateCreateComponent> {
  constructor(someFixture: ComponentFixture<TemplateCreateComponent>) {
    super(someFixture);
  }
  get getSaveButton():HTMLButtonElement{
    return this.query<HTMLButtonElement>(`#btnSaveTemplate`);
  }
}
