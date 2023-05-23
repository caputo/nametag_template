import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NametagListComponent } from "./nametag-list.component";
import { NametagListComponentPageSpec } from "./nametag-list.component.page.spec";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { MockNametagData } from "../mock-nametag.data";
import { RouterTestingModule } from "@angular/router/testing";
import { Nametag } from "../nametag.model";

describe("NametagListComponent", () => {
  let component: NametagListComponent;
  let fixture: ComponentFixture<NametagListComponent>;
  let page: NametagListComponentPageSpec;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NametagListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: ({
            data: of({ nametags: MockNametagData.nametags })
          } as any) as ActivatedRoute
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NametagListComponent);
    component = fixture.componentInstance;
    page = new NametagListComponentPageSpec(fixture);

    fixture.detectChanges();
  });

  it("should list all nametags", () => {
    expect(page.nametags.length).toEqual(MockNametagData.nametags.length);

    // Do a rough search to make sure all the nametags are present.
    MockNametagData.nametags.forEach((n: Nametag, i: number) => {
      expect(page.nametags[i].textContent).toContain(n.firstName);
      expect(page.nametags[i].href).toContain(n.id);
    });
  });
});
