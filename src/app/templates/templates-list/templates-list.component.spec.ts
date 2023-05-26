import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesListComponent } from './templates-list.component';
import { TemplatesListComponentPageSpec } from './templates-list.component.page.spec';
import { NametagCardComponent } from 'src/app/nametags/nametag-card/nametag-card.component';
import { NametagTemplatesDefault } from 'src/app/models/nametag-templates-default';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { NametagTemplate } from 'src/app/models/nametag-template.model';
import {of} from 'rxjs';
import { NametagTemplatesService } from 'src/app/services/nametag-templates.service';

describe('TemplatesListComponent', () => {
  let component: TemplatesListComponent;
  let fixture: ComponentFixture<TemplatesListComponent>;
  let childFixture: ComponentFixture<NametagCardComponent>;
  let page: TemplatesListComponentPageSpec;
  const mockData = NametagTemplatesDefault.getAllTemplates();
  NametagTemplatesService.templates = mockData;
  let nametagTemplatesService: jasmine.SpyObj<NametagTemplatesService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TemplatesListComponent, NametagCardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: ({
            data: of({templates:mockData})
          } as any) as ActivatedRoute
        }, {
        provide: NametagTemplatesService, 
        useValue:  jasmine.createSpyObj("NametagTemplatesService", ["list"])
        }
      ]
    }).compileComponents();


  });

  beforeEach(() => {
    
    nametagTemplatesService = TestBed.inject(NametagTemplatesService) as jasmine.SpyObj<NametagTemplatesService>;
    nametagTemplatesService.list.and.returnValue(Promise.resolve(NametagTemplatesDefault.getAllTemplates()));
    fixture = TestBed.createComponent(TemplatesListComponent);    
    component = fixture.componentInstance;
    page = new TemplatesListComponentPageSpec(fixture);        
    fixture.detectChanges();    
  });

  it("should list all templates", () => {

    expect(page.getLinks.length).toEqual(mockData.length);

    // Do a rough search to make sure all the nametags are present.
    for(var i=0;i<mockData.length;i++){      
      expect(page.getLinks[i].id).toContain(mockData[i].slug);      
    }    
  });
});
