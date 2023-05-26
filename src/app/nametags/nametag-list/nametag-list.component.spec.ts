import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NametagListComponent } from "./nametag-list.component";
import { NametagListComponentPageSpec } from "./nametag-list.component.page.spec";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { MockNametagData } from "../../models/mock-nametag.data";
import { RouterTestingModule } from "@angular/router/testing";
import { Nametag } from "../../models/nametag.model";
import { NametagTemplatesService } from "src/app/services/nametag-templates.service";
import { NametagTemplatesDefault } from "src/app/models/nametag-templates-default";
import { NametagCardComponent } from "../nametag-card/nametag-card.component";

describe("NametagListComponent", () => {
  let component: NametagListComponent;
  let fixture: ComponentFixture<NametagListComponent>;
  let childFixture: ComponentFixture<NametagCardComponent>;
  let page: NametagListComponentPageSpec;
  NametagTemplatesService.templates = NametagTemplatesDefault.getAllTemplates();
  const mockData = MockNametagData.nametags.map(s => new Nametag(s.serialize()));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NametagListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: ({
            data: of({ nametags: [NametagTemplatesDefault.getAllTemplates(), mockData] })
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
      fixture.detectChanges();
      expect(page.nametags[i].title).toContain(n.firstName);
    });
  });
});
