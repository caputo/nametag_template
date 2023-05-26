import { PageSpec } from "../../shared/page.spec";
import { ComponentFixture } from "@angular/core/testing";
import { TemplateEditComponent } from "./template-edit.component";

export class TemplateEditComponentPageSpec extends PageSpec<
TemplateEditComponent
> {
  constructor(someFixture: ComponentFixture<TemplateEditComponent>) {
    super(someFixture);
  }

  get getSaveButton():HTMLButtonElement{
    return this.query<HTMLButtonElement>(`#btnSaveTemplate`);
  }
}
