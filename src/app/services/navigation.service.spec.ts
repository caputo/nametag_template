import { TestBed } from "@angular/core/testing";

import { NavigationService } from "./navigation.service";
import { Router } from "@angular/router";
import { AppRoutes } from "../shared/app-routes";

describe("NavigationService", () => {
  let service: NavigationService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NavigationService,
        {
          provide: Router,
          useValue: jasmine.createSpyObj("Router", ["navigate"])
        }
      ]
    });

    service = TestBed.inject(NavigationService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });


  it("should navigate to the nametag edit page", () => {
    // Given
    router.navigate.and.returnValue(Promise.resolve(true));

    // When
    const nametagId = "123";
    service.goToNametagEdit(nametagId);

    // Then
    expect(router.navigate).toHaveBeenCalledWith([
      "/",
      "nametags",
      "123",
      "edit"
    ]);
  });

  it("should navigate to the nametag create page", () => {
    // Given
    router.navigate.and.returnValue(Promise.resolve(true));

    // When
    service.goToNametagCreate();

    // Then
    expect(router.navigate).toHaveBeenCalledWith(["/", "nametags", "create"]);
  });

  it("should navigate to the nametag list page", () => {
    // Given
    router.navigate.and.returnValue(Promise.resolve(true));

    // When
    service.goToNametagList();

    // Then
    expect(router.navigate).toHaveBeenCalledWith(["/", "nametags", "list"]);
  });

  it("should navigate to the template list page", () => {
    // Given
    router.navigate.and.returnValue(Promise.resolve(true));

    // When
    service.goToTemplatesList();

    // Then
    expect(router.navigate).toHaveBeenCalledWith(["/", "nametags", "templates", "list"]);
  });

  it("should navigate to the template create page", () => {
    // Given
    router.navigate.and.returnValue(Promise.resolve(true));

    // When
    service.goToTemplateCreate();

    // Then
    expect(router.navigate).toHaveBeenCalledWith(["/", "nametags", "templates","create"]);
  });

  it("should navigate to the template edit page", () => {
    // Given
    router.navigate.and.returnValue(Promise.resolve(true));


    // When
    const templateId = "123";
    service.goToTemplateEdit(templateId);    

    var url = AppRoutes.NAMETAG_CONTAINER.buildFragments().concat(["templates","123","edit"]);
    
    // Then
    expect(router.navigate).toHaveBeenCalledWith(url);
  });
});
