import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEditorComponent } from './template-editor.component';
import { AppEventsService } from 'src/app/services/app-events.service';
import { NametagTemplatesDefault } from 'src/app/models/nametag-templates-default';
import { TemplateEditorComponentPageSpec } from './template-editor.component.page.spec';

describe('TemplateEditorComponent', () => {
  let component: TemplateEditorComponent;
  let fixture: ComponentFixture<TemplateEditorComponent>;
  let appEventsService: jasmine.SpyObj<AppEventsService>;
  let page: TemplateEditorComponentPageSpec;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateEditorComponent],
      providers: [
        {
          provide: AppEventsService,
          useValue: jasmine.createSpyObj("AppEventsService", ["NotifyTemplateChanged"])
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateEditorComponent);
    appEventsService = TestBed.inject(AppEventsService) as jasmine.SpyObj<AppEventsService>;
    page = new TemplateEditorComponentPageSpec(fixture);
    component = fixture.componentInstance;
    component.template = NametagTemplatesDefault.SLEEK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call template update event when key down on css textarea', () => {
    //Given
    const textArea = page.getCssText;
    var keyEvent = new KeyboardEvent('keyup', { key: 'A' });

    //When
    textArea.dispatchEvent(keyEvent);

    //Then
    expect(appEventsService.NotifyTemplateChanged).toHaveBeenCalled();
  });

  it('should call save function when click save', () => {
    //Given
    let called = false;
    const save = () => {called = true;}

    //When
    component.saveFunction = save;
    page.getSaveButton.click();

    //Then
    expect(called).toBe(true);
  });
});
