import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NametagEditComponent } from "./nametag-edit.component";
import { NametagEditComponentPageSpec } from "./nametag-edit.component.page.spec";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { MockNametagData } from "../../models/mock-nametag.data";
import { NametagService } from "../nametag.service";

describe("NametagEditComponent", () => {
  let component: NametagEditComponent;
  let fixture: ComponentFixture<NametagEditComponent>;
  let page: NametagEditComponentPageSpec;
  let nametagService: jasmine.SpyObj<NametagService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NametagEditComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: ({
            data: of({ nametag: MockNametagData.nametag })
          } as any) as ActivatedRoute
        },
        {
          provide: NametagService,
          useValue: jasmine.createSpyObj("NametagService", ["updateNametag"])
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    nametagService = TestBed.inject(NametagService) as jasmine.SpyObj<
      NametagService
    >;
    fixture = TestBed.createComponent(NametagEditComponent);
    component = fixture.componentInstance;
    page = new NametagEditComponentPageSpec(fixture);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // TODO: Write your own tests here!
});
