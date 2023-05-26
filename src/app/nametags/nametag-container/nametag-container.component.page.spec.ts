/**
 * A page object that simplifies interaction with this
 * component's DOM in unit tests.
 */
import { PageSpec } from "../../shared/page.spec";
import { NametagContainerComponent } from "./nametag-container.component";
import { ComponentFixture } from "@angular/core/testing";
import { AppRoutes } from "../../shared/app-routes";

export class NametagContainerComponentPageSpec extends PageSpec<NametagContainerComponent> {
  get nametagCreateLink(): HTMLButtonElement {
    return this.query<HTMLButtonElement>(`.${AppRoutes.NAMETAG_CREATE.linkClass}`);
  }

  get nametagListLink(): HTMLLinkElement {
    return this.query<HTMLLinkElement>(`.${AppRoutes.NAMETAG_LIST.linkClass}`);
  }

  get errorMessageSpan(): HTMLSpanElement {
    return this.query<HTMLSpanElement>(`#errorMessage`);
  }
  constructor(someFixture: ComponentFixture<NametagContainerComponent>) {
    super(someFixture);
  }
}
