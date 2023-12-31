import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEditComponent } from './template-edit.component';
import { TemplateEditorComponent } from '../template-editor/template-editor.component';
import { NametagTemplatesService } from 'src/app/services/nametag-templates.service';
import { AppEventsService } from 'src/app/services/app-events.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TemplateEditComponentPageSpec } from './template-edit.component.page.spec';
import { NametagTemplatesDefault } from 'src/app/models/nametag-templates-default';
import { AppMessagesDefault, MessageLevel } from 'src/app/shared/error-messages';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TemplateEditComponent', () => {
  let component: TemplateEditComponent;
  let fixture: ComponentFixture<TemplateEditComponent>;
  let childFixture: ComponentFixture<TemplateEditorComponent>;
  let templatesService: jasmine.SpyObj<NametagTemplatesService>;
  let appEventsService: jasmine.SpyObj<AppEventsService>;
  let navigationService: jasmine.SpyObj<NavigationService>;
  let page:TemplateEditComponentPageSpec;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateEditComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: ({
            data: of({ template:NametagTemplatesDefault.SLEEK})
          } as any) as ActivatedRoute
        },
        {
          provide: NametagTemplatesService,
          useValue: jasmine.createSpyObj("NametagTemplatesService", ["update"])
        },
        {
          provide:AppEventsService, 
          useValue: jasmine.createSpyObj("AppEventsService", ["PublishMessage"])
        },
        {
          provide:NavigationService, 
          useValue: jasmine.createSpyObj("NavigationService", ["goToTemplatesList"])
        }
      ]
    }).configureTestingModule({
      declarations: [ TemplateEditorComponent ],
      providers: [     
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    templatesService = TestBed.inject(NametagTemplatesService) as jasmine.SpyObj<NametagTemplatesService>;
    appEventsService = TestBed.inject(AppEventsService) as jasmine.SpyObj<AppEventsService>;
    navigationService = TestBed.inject(NavigationService) as jasmine.SpyObj<NavigationService>;
    fixture = TestBed.createComponent(TemplateEditComponent);
    childFixture = TestBed.createComponent(TemplateEditorComponent);
    page = new TemplateEditComponentPageSpec(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should call the save function and update call tha update and publish message", async() => {
    //Given
    component.ngOnInit();
    childFixture.componentInstance.template = component.template;    
    templatesService.update.and.returnValue(Promise.resolve(NametagTemplatesDefault.SLEEK));
    
    //When
    const btnSave = page.getSaveButton;
    await btnSave.click();

    //Then
    expect(templatesService.update).toHaveBeenCalled();
    expect(navigationService.goToTemplatesList).toHaveBeenCalled();
    expect(appEventsService.PublishMessage).toHaveBeenCalledWith({message:AppMessagesDefault.UPDATE_TEMPLATE_SUCESS, level:MessageLevel.INFO});    
  });

  it("should call the save function send error message when fails", async() => {        
    //Given
    component.ngOnInit();
    childFixture.componentInstance.template = component.template;           
    templatesService.update.and.returnValue(
      Promise.reject("Unit Test Error")
    );

    //When
    const btnSave = page.getSaveButton;
    await btnSave.click();    
    
    //Then
    expect(templatesService.update).toHaveBeenCalled();    
    expect(appEventsService.PublishMessage).toHaveBeenCalledWith({message:"Unit Test Error", level:MessageLevel.ERROR});
  });
});
