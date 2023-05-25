import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NametagCardComponent } from './nametag-card.component';
import { Nametag } from '../../../models/nametag.model';
import { NametagTemplateSlug, NametagTemplates } from '../../../models/nametag-templates-default';

describe('NametagCardComponent', () => {
  let component: NametagCardComponent;
  let fixture: ComponentFixture<NametagCardComponent>;

  let nametagMock: Nametag = new Nametag({
    firstName:"test",
    id:"1",
    profession:"profession",
    templateSlug:NametagTemplateSlug.Playful    
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NametagCardComponent ]
    })
    .compileComponents();    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NametagCardComponent);
    component = fixture.componentInstance;
    component.nametag = nametagMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
