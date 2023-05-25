import { TestBed } from '@angular/core/testing';

import { NametagTemplatesService } from './nametag-templates.service';

describe('NametagTemplatesService', () => {
  let service: NametagTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NametagTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
