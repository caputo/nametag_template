import { TestBed } from '@angular/core/testing';

import { NametagTemplatesService } from './nametag-templates.service';
import { LocalStorageService } from './local-storage.service';
import { NametagTemplate } from '../models/nametag-template.model';
import { GenericLocalStorageService } from './generic-localstorage-service';
import { NametagTemplatesDefault } from '../models/nametag-templates-default';

describe('NametagTemplatesService', () => {
  let service: NametagTemplatesService;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NametagTemplatesService,
        {
          provide: LocalStorageService,
          useValue: jasmine.createSpyObj("LocalStorageService", [
            "loadData",
            "create",
            "saveData"
          ])
        } 
      ]
    });    
    
    service = TestBed.inject(NametagTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call create with default templates when nothing is returned from local storage',()=>{ 
    spyOn(service,'create').and.returnValue(Promise.resolve(NametagTemplatesDefault.SLEEK));
    service.validateInitialize([]);
    expect(service.create).toHaveBeenCalled();
  })

});
