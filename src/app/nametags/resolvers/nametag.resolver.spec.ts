import { TestBed } from "@angular/core/testing";

import { NametagResolver } from "./nametag.resolver";
import { NametagService } from "../nametag.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MockNametagData } from "../mock-nametag.data";

// I don't really understand this type, but it's useful to allow us to
// mock ActivatedRoute. See: https://stackoverflow.com/a/57425844
const mock = <T, P extends keyof T>(obj: Pick<T, P>): T => obj as T;

describe("NametagResolver", () => {
  let resolver: NametagResolver;
  let nametagService: jasmine.SpyObj<NametagService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NametagService,
          useValue: jasmine.createSpyObj("NametagService", ["fetchNametag"])
        }
      ]
    });
    resolver = TestBed.inject(NametagResolver);
    nametagService = TestBed.inject(NametagService) as jasmine.SpyObj<
      NametagService
    >;
  });

  it("should fetch a given nametag", () => {
    // Given
    nametagService.fetchNametag.and.returnValue(
      Promise.resolve(MockNametagData.nametag)
    );

    const mockRoute = mock<ActivatedRouteSnapshot, "params">({
      params: {
        nametagId: "128"
      }
    });

    // When
    resolver.resolve(mockRoute, {} as RouterStateSnapshot);

    // Then
    expect(nametagService.fetchNametag).toHaveBeenCalledWith("128");
  });
});
