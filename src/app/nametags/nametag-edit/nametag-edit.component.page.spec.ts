import { PageSpec } from "../../shared/page.spec";
import { ComponentFixture } from "@angular/core/testing";
import { NametagEditComponent } from "./nametag-edit.component";

export class NametagEditComponentPageSpec extends PageSpec<
  NametagEditComponent
> {
  constructor(someFixture: ComponentFixture<NametagEditComponent>) {
    super(someFixture);
  }

  get getSaveButton():HTMLButtonElement{
    return this.query<HTMLButtonElement>(`#btnSaveTagNameEdit`);
  }

  get getName():HTMLInputElement{
    return this.query<HTMLInputElement>(`#txtTagName`);
  }

  get getProfession():HTMLInputElement{
    return this.query<HTMLInputElement>(`#txtTagProfession`);
  }
}
