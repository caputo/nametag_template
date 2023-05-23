import { ComponentFixture } from "@angular/core/testing";

/**
 * A page object that simplifies interaction with this
 * component's DOM in unit tests.
 */
export abstract class PageSpec<T> {
  protected fixture: ComponentFixture<T>;
  protected navigateSpy: jasmine.Spy;

  protected constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
  }

  protected query<D>(selector: string): D {
    return this.fixture.nativeElement.querySelector(selector);
  }

  protected queryAll<D>(selector: string): D[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}
