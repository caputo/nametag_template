import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NametagCreateComponent } from "./nametag-create.component";
import { NametagCreateComponentPageSpec } from "./nametag-create.component.page.spec";
import { RouterTestingModule } from "@angular/router/testing";
import { NametagService } from "../../services/nametag.service";
import { NavigationService } from "../../services/navigation.service";
import { MockNametagData } from "../../models/mock-nametag.data";
import { NametagTemplatesService } from "src/app/services/nametag-templates.service";
import { NametagTemplatesDefault } from "src/app/models/nametag-templates-default";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

describe("NametagCreateComponent", () => {
  let component: NametagCreateComponent;
  let fixture: ComponentFixture<NametagCreateComponent>;
  let page: NametagCreateComponentPageSpec;
  let nametagService: jasmine.SpyObj<NametagService>;
  let navigationService: jasmine.SpyObj<NavigationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NametagCreateComponent],
      providers: [
        {
          provide: NametagService,
          useValue: jasmine.createSpyObj("NametagService", ["createNametag"])
        },
        {
          provide: NavigationService,
          useValue: jasmine.createSpyObj("NavigationService", [
            "goToNametagEdit"
          ])
        },
        {
          provide: ActivatedRoute,
          useValue: ({
            data: of({ templates: NametagTemplatesDefault.getAllTemplates() })
          } as any) as ActivatedRoute
        }

      ]
    }).compileComponents();

    //TODO: This property should be private and should be mocked
    NametagTemplatesService.templates = NametagTemplatesDefault.getAllTemplates();
  });

  beforeEach(() => {
    nametagService = TestBed.inject(NametagService) as jasmine.SpyObj<
      NametagService
    >;
    navigationService = TestBed.inject(NavigationService) as jasmine.SpyObj<
      NavigationService
    >;

    fixture = TestBed.createComponent(NametagCreateComponent);
    component = fixture.componentInstance;
    page = new NametagCreateComponentPageSpec(fixture);


    fixture.detectChanges();
  });

  it("should display the sleek template as an option", async () => {    
    // Given     
    fixture.detectChanges();
    nametagService.createNametag.and.returnValue(
      Promise.resolve(MockNametagData.nametag)
    );

    // When
    await page.sleekTemplateLink.click();

    // Then
    expect(nametagService.createNametag).toHaveBeenCalled();
    expect(navigationService.goToNametagEdit).toHaveBeenCalledWith(
      MockNametagData.nametag.id
    );
  });

  it("should display the playful template as an option", async () => {
    // Given
    nametagService.createNametag.and.returnValue(
      Promise.resolve(MockNametagData.nametag)
    );

    // When
    await page.playfullTemplateLink.click();

    // Then
    expect(nametagService.createNametag).toHaveBeenCalled();
    expect(navigationService.goToNametagEdit).toHaveBeenCalledWith(
      MockNametagData.nametag.id
    );
  });
});
