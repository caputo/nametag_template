import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NametagCardComponent } from './nametag-card.component';

describe('NametagCardComponent', () => {
  let component: NametagCardComponent;
  let fixture: ComponentFixture<NametagCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NametagCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NametagCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
