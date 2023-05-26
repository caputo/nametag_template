/**
 * A page object that simplifies interaction with this
 * component's DOM in unit tests.
 */
import { PageSpec } from "../../shared/page.spec";
import { NametagCardComponent } from "./nametag-card.component";
import { ComponentFixture } from "@angular/core/testing";
import { AppRoutes } from "../../shared/app-routes";

export class NametagCardComponentPageSpec extends PageSpec<
  NametagCardComponent
> {
  get nametagCreateLink(): HTMLButtonElement {
    return this.query<HTMLButtonElement>(
      `.${AppRoutes.NAMETAG_CREATE.linkClass}`
    );
  }

  get nametagListLink(): HTMLLinkElement {
    return this.query<HTMLLinkElement>(`.${AppRoutes.NAMETAG_LIST.linkClass}`);
  }

  get getInputName(): HTMLInputElement {
    return this.query<HTMLInputElement>(`#txtTagName`);
  }

  getSyleClassElement(cssClass: string): HTMLStyleElement {
    return this.query<HTMLStyleElement>('#' + cssClass);
  }

  getAllCssClasses(): string[] {
    const allClasses: string[] = [];
    // Iterate through all stylesheets
    for (let i = 0; i < document.styleSheets.length; i++) {
      const styleSheet = document.styleSheets[i];

      // Handle different types of stylesheets
      if (styleSheet instanceof CSSStyleSheet) {
        const cssRules = styleSheet.cssRules;

        // Iterate through the CSS rules
        for (let j = 0; j < cssRules.length; j++) {
          const cssRule = cssRules[j];

          // Check if the rule is a CSSStyleRule
          if (cssRule instanceof CSSStyleRule) {
            const selectorText = cssRule.selectorText;

            // Extract the CSS classes from the selector
            const classes = selectorText.split('.').slice(1);
            allClasses.push(...classes);
          }
        }
      }
    }
    return allClasses;
  }


  constructor(someFixture: ComponentFixture<NametagCardComponent>) {
    super(someFixture);
  }
}
