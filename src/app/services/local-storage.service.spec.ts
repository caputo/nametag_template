import { TestBed } from "@angular/core/testing";

import { LocalStorageService, StorageKey } from "./local-storage.service";

describe("LocalStorageService", () => {
  let service: LocalStorageService;
  let mockLocalStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);

    const localStorageStore = {};
    mockLocalStorage = {
      getItem: (key: string): string => {
        return key in localStorageStore ? localStorageStore[key] : null;
      },
      setItem: (key: string, value: string) => {
        localStorageStore[key] = `${value}`;
      }
    };

    spyOn(localStorage, "getItem").and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, "setItem").and.callFake(mockLocalStorage.setItem);
  });

  it("should load data that exists", () => {
    // Given
    const dataToLoad = JSON.stringify({ someProperty: "someData" });

    // When
    localStorage.setItem(StorageKey.Nametags, dataToLoad);

    // Then
    expect(service.loadData(StorageKey.Nametags)).toEqual({
      someProperty: "someData"
    });
    expect(localStorage.getItem).toHaveBeenCalledWith(StorageKey.Nametags);
  });

  it("should load default value when data does not exist", () => {
    const defaultVal = [];
    expect(service.loadData(StorageKey.Nametags, defaultVal)).toEqual(
      defaultVal
    );
  });

  it("should save data", () => {
    // Given
    const dataToSave = { someProperty: "someData" };

    // When
    service.saveData(StorageKey.Nametags, dataToSave);

    // Then
    expect(localStorage.setItem).toHaveBeenCalledWith(
      StorageKey.Nametags,
      JSON.stringify(dataToSave)
    );
  });
});
