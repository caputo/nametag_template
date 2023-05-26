import { TestBed } from "@angular/core/testing";

import { NametagListResolver } from "./nametag-list.resolver";
import { NametagService } from "../services/nametag.service";
import { MockNametagData } from "../models/mock-nametag.data";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

describe("NametagListResolver", () => {
  let resolver: NametagListResolver;
  let nametagService: jasmine.SpyObj<NametagService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NametagService,
          useValue: jasmine.createSpyObj("NametagService", ["listNametags"])
        }
      ]
    });
    resolver = TestBed.inject(NametagListResolver);
    nametagService = TestBed.inject(NametagService) as jasmine.SpyObj<
      NametagService
    >;
  });

  it("should fetch a list of all nametags", () => {
    nametagService.listNametags.and.returnValue(
      Promise.resolve(MockNametagData.nametags)
    );

    resolver.resolve({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(nametagService.listNametags).toHaveBeenCalledTimes(1);
  });
});
