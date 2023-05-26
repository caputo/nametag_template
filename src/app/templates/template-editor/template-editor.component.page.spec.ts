import { PageSpec } from "../../shared/page.spec";
import { ComponentFixture } from "@angular/core/testing";
import { TemplateEditorComponent } from "./template-editor.component";

export class TemplateEditorComponentPageSpec extends PageSpec<
TemplateEditorComponent
> {
  constructor(someFixture: ComponentFixture<TemplateEditorComponent>) {
    super(someFixture);
  }

  get getSaveButton():HTMLButtonElement{
    return this.query<HTMLButtonElement>(`#btnSaveTemplate`);
  }
  get getCssText():HTMLTextAreaElement{
    return this.query<HTMLTextAreaElement>(`#txtTemplateCss`);
  }
}
