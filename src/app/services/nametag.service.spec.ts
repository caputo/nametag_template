import { TestBed } from "@angular/core/testing";

import { NametagService } from "./nametag.service";
import {
  LocalStorageService,
  StorageKey
} from "../shared/local-storage.service";
import { MockNametagData } from "../models/mock-nametag.data";
import { AppMessagesDefault } from "../shared/error-messages";

describe("NametagService", () => {
  let service: NametagService;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NametagService,
        {
          provide: LocalStorageService,
          useValue: jasmine.createSpyObj("LocalStorageService", [
            "loadData",
            "saveData"
          ])
        }
      ]
    });

    service = TestBed.inject(NametagService);
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<
      LocalStorageService
    >;
  });

  it("should create a nametag when none already exist", async () => {
    localStorageService.loadData.and.returnValue([]);
    // Given a new nametag to create.
    const newNametag = MockNametagData.nametag;

    // When we attempt to save it.
    const result = service.createNametag(newNametag);

    // Then we succeed.
    expect(await result).toEqual(newNametag);
    expect(localStorageService.saveData).toHaveBeenCalledWith(
      StorageKey.Nametags,
      [newNametag.serialize()]
    );
  });

  it("should create a nametag when other nametags exist", async () => {
    localStorageService.loadData.and.returnValue(MockNametagData.nametags);
    // Given a new nametag to create.
    const newNametag = MockNametagData.nametag;

    // When we attempt to save it.
    const result = service.createNametag(newNametag);

    // Then we succeed.
    expect(await result).toEqual(newNametag);
    // Remember that we store the serialized representations of the nametags,
    // not the objects themselves.
    const expectedNametags = [...MockNametagData.nametags, newNametag].map(n =>
      n.serialize()
    );
    expect(localStorageService.saveData).toHaveBeenCalledWith(
      StorageKey.Nametags,
      expectedNametags
    );
  });

  it("should fail to create a nametag that already exists", async () => {
    localStorageService.loadData.and.returnValue([MockNametagData.nametag]);
    // Given a new nametag to create.
    const newNametag = MockNametagData.nametag;

    // When we attempt to save it.
    const result = service.createNametag(newNametag);

    // Then we fail.
    await expectAsync(result).toBeRejectedWith(
      AppMessagesDefault.CREATE_DUPLICATE_NAMETAG
    );
    expect(localStorageService.saveData).not.toHaveBeenCalled();
  });

  it("should update a nametag that already exists", async () => {
    localStorageService.loadData.and.returnValue([MockNametagData.nametag]);
    // Given an existing nametag to update.
    const nametagToUpdate = MockNametagData.nametag;
    nametagToUpdate.firstName = "Something-new";

    // When we attempt to update it.
    const result = service.updateNametag(nametagToUpdate);

    // Then we succeed.
    expect(await result).toEqual(nametagToUpdate);
    // Then the data actually gets updated.
    expect(nametagToUpdate.serialize().firstName).toEqual("Something-new");
    expect(localStorageService.saveData).toHaveBeenCalledWith(
      StorageKey.Nametags,
      [nametagToUpdate.serialize()]
    );
  });

  it("should fail to update a nametag that doesn't exist", async () => {
    localStorageService.loadData.and.returnValue([]);
    // Given a nametag to update the doesn't exist.
    const nonexistentNametag = MockNametagData.nametag;

    // When we attempt to update it.
    const result = service.updateNametag(nonexistentNametag);

    // Then we fail.
    await expectAsync(result).toBeRejectedWith(
      AppMessagesDefault.UPDATE_NONEXISTENT_NAMETAG
    );
    expect(localStorageService.saveData).not.toHaveBeenCalled();
  });

  it("should fetch a nametag that already exists", async () => {
    localStorageService.loadData.and.returnValue(MockNametagData.nametags);
    // Given an existing nametag to fetch.
    const nametagToFetch = MockNametagData.nametags[0];

    // When we attempt to fetch it.
    const result = service.fetchNametag(nametagToFetch.id);

    // Then we succeed.
    expect(await result).toEqual(nametagToFetch);
    expect(localStorageService.saveData).not.toHaveBeenCalled();
  });

  it("should fail to fetch a nametag that doesn't exist", async () => {
    localStorageService.loadData.and.returnValue(MockNametagData.nametags);
    // Given an ID that doesn't match any nametags.
    const invalidId = "gibberish";

    // When we attempt to fetch it.
    const result = service.fetchNametag(invalidId);

    // Then we fail.
    await expectAsync(result).toBeRejectedWith(
      AppMessagesDefault.FETCH_NONEXISTENT_NAMETAG
    );
    expect(localStorageService.saveData).not.toHaveBeenCalled();
  });

  it("should list all nametags that exist", async () => {
    localStorageService.loadData.and.returnValue(MockNametagData.nametags);

    const result = service.listNametags();
    expect(await result).toEqual(MockNametagData.nametags);
  });
});
