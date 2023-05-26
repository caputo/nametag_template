import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateCreateComponent } from './template-create.component';
import { NametagTemplatesService } from 'src/app/services/nametag-templates.service';
import { AppEventsService } from 'src/app/services/app-events.service';
import { AppMessagesDefault, MessageLevel } from 'src/app/shared/error-messages';
import { NametagTemplatesDefault } from 'src/app/models/nametag-templates-default';
import { TemplateCreateComponentPageSpec } from './template-create.component.page.spec';
import { NavigationService } from 'src/app/services/navigation.service';
import { TemplateEditorComponent } from '../template-editor/template-editor.component';

describe('TemplateCreateComponent', () => {
  let component: TemplateCreateComponent;
  let fixture: ComponentFixture<TemplateCreateComponent>;
  let childFixture: ComponentFixture<TemplateEditorComponent>;
  let templatesService: jasmine.SpyObj<NametagTemplatesService>;
  let appEventsService: jasmine.SpyObj<AppEventsService>;
  let navigationService: jasmine.SpyObj<NavigationService>;
  let page:TemplateCreateComponentPageSpec;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateCreateComponent],
      providers: [
        {
          provide: NametagTemplatesService,
          useValue: jasmine.createSpyObj("NametagTemplatesService", ["create"])
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
    fixture = TestBed.createComponent(TemplateCreateComponent);
    childFixture = TestBed.createComponent(TemplateEditorComponent);
    page = new TemplateCreateComponentPageSpec(fixture);
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
    templatesService.create.and.returnValue(
      Promise.resolve(NametagTemplatesDefault.SLEEK)
    );
    childFixture.detectChanges();

    //When
    const btnSave = page.getSaveButton;
    await btnSave.click();

    //Then
    expect(templatesService.create).toHaveBeenCalled();
    expect(appEventsService.PublishMessage).toHaveBeenCalledWith({message:AppMessagesDefault.CREATE_TEMPLATE_SUCESS, level:MessageLevel.INFO});
    expect(component).toBeTruthy();
  });

  it("should call the save function send error message when fails", async() => {        

    //Given
    component.ngOnInit();
    childFixture.componentInstance.template = component.template;        
    childFixture.detectChanges();
    templatesService.create.and.returnValue(
      Promise.reject("Unit Test Error")
    );

    //When
    var btnSave = page.getSaveButton;
    await btnSave.click();    
    
    //Then
    expect(templatesService.create).toHaveBeenCalled();
    expect(appEventsService.PublishMessage).toHaveBeenCalledWith({message:"Unit Test Error", level:MessageLevel.ERROR});
  });

  it("should call allert when the slug is not filled", async() => {        
      //Given
      component.ngOnInit();
      childFixture.componentInstance.template = component.template;    
      component.template.slug = null;       
      childFixture.detectChanges();

      //When
      const btnSave = page.getSaveButton;
      await btnSave.click();

      //Then      
      expect(appEventsService.PublishMessage).toHaveBeenCalledWith({message:AppMessagesDefault.CREATE_TEMPLATE_ALERT_FIELD, level:MessageLevel.WARNING});
      expect(component).toBeTruthy();
  });
});
