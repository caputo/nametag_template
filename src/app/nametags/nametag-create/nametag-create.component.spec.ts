import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NametagCreateComponent } from "./nametag-create.component";
import { NametagCreateComponentPageSpec } from "./nametag-create.component.page.spec";
import { RouterTestingModule } from "@angular/router/testing";
import { NametagService } from "../nametag.service";
import { NavigationService } from "../../shared/navigation.service";
import { MockNametagData } from "../../models/mock-nametag.data";

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
        }
      ]
    }).compileComponents();
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
    nametagService.createNametag.and.returnValue(
      Promise.resolve(MockNametagData.nametag)
    );

    // When
    await page.sleekTemplateImage.click();

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
    await page.playfulTemplateImage.click();

    // Then
    expect(nametagService.createNametag).toHaveBeenCalled();
    expect(navigationService.goToNametagEdit).toHaveBeenCalledWith(
      MockNametagData.nametag.id
    );
  });
});
