import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NametagContainerComponent } from "./nametag-container.component";
import { NametagContainerComponentPageSpec } from "./nametag-container.component.page.spec";
import { RouterTestingModule } from "@angular/router/testing";

describe("NametagContainerComponent", () => {
  let component: NametagContainerComponent;
  let fixture: ComponentFixture<NametagContainerComponent>;
  let page: NametagContainerComponentPageSpec;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NametagContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NametagContainerComponent);
    component = fixture.componentInstance;
    page = new NametagContainerComponentPageSpec(fixture);

    fixture.detectChanges();
  });

  it("should display link to nametag create page", () => {
    expect(page.nametagCreateLink).toBeTruthy();
  });

  it("should display link to nametag list page", () => {
    expect(page.nametagListLink).toBeTruthy();
  });

  it("sould display message"), () =>{
    //TODO
  }
});
