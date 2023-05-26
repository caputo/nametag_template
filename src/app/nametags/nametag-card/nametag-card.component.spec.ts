import { ComponentFixture, TestBed, tick, fakeAsync, waitForAsync } from '@angular/core/testing';
import { NametagCardComponent } from './nametag-card.component';
import { Nametag } from '../../models/nametag.model';
import { NametagTemplateSlugDefaults, NametagTemplatesDefault } from '../../models/nametag-templates-default';
import { AppEventsService } from 'src/app/services/app-events.service';
import { MockNametagData } from 'src/app/models/mock-nametag.data';
import { NametagCardComponentPageSpec } from './nametag-card.component.page.spec';
import { Subject } from 'rxjs';

describe('NametagCardComponent', () => {
  let component: NametagCardComponent;
  let fixture: ComponentFixture<NametagCardComponent>;
  let appEventsService: Partial<AppEventsService>;
  let page: NametagCardComponentPageSpec;
  let nametagMock: Nametag = new Nametag({
    firstName: "test",
    id: "1",
    profession: "profession",
    templateSlug: NametagTemplateSlugDefaults.Playful
  });

  beforeEach(async () => {
    appEventsService = {
      templateChanged: new Subject()
    };

    await TestBed.configureTestingModule({
      declarations: [NametagCardComponent],
      providers: [
        {
          provide: AppEventsService,
          useValue: appEventsService
        }
      ]
    })
      .compileComponents();
    nametagMock.template = NametagTemplatesDefault.PLAYFUL;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NametagCardComponent);
    component = fixture.componentInstance;
    component.nametag = nametagMock;
    page = new NametagCardComponentPageSpec(fixture);
    fixture.detectChanges();
  });

  it('should call writeStyles on ngOnInit', () => {
    //Given
    spyOn(component, 'writeStyles');
    component.nametag = MockNametagData.nametag;
    component.editEnabled = true;

    //When
    component.ngOnInit();

    //Then
    expect(component.writeStyles).toHaveBeenCalledWith(MockNametagData.nametag.template);
  });

  it('should subscribe to templateChanged event on ngOnInit', () => {
    //Given
    spyOn(component, 'writeStyles');
    component.nametag = MockNametagData.nametag;
    component.editEnabled = true;

    //When
    component.ngOnInit();
    appEventsService.templateChanged.next(null);

    //Then
    expect(component.writeStyles).toHaveBeenCalledWith(MockNametagData.nametag.template);
  });

  it('should create and write the css class in the document', () => {
    //Given
    spyOn(component, 'writeStyles');
    component.nametag = nametagMock;
    component.editEnabled = true;

    //When
    component.ngOnInit();

    //Then
    const allClasses = page.getAllCssClasses();
    expect(allClasses).toContain(nametagMock.templateSlug);

  });

  it('should recreate and write the css class in the document when event dispatched', fakeAsync(async () => {
    //Given
    spyOn(component, 'handleTemplateChanged');
    component.nametag = nametagMock;
    component.editEnabled = true;

    //When
    component.ngOnInit();
    appEventsService.templateChanged.next(null);

    //Then
    fixture.detectChanges();
    expect(component.handleTemplateChanged).toHaveBeenCalled();


  }));

  it('should  not allow enter more characters when reach maximum ', () => {

    //Given

    //The type Arial fits x character     
    var name = fixture.nativeElement.querySelector("#txtTagName");
    console.log(name);
    name.style.fontFamily = "Arial";
    name.style.fontSize = "70px";
    name.style.letterSpacing = "11px";
    name.style.fontWeight = "600";
    name.value = "ABCDEFG";
    //The type Arial fits x character 
    var keydownevent = new KeyboardEvent('keydown', {
      key: 'H'
    });
    const spyEvent = spyOn(keydownevent, 'preventDefault');


    //When
    name.dispatchEvent(keydownevent);
    fixture.detectChanges();

    //Then
    expect(spyEvent).toHaveBeenCalledTimes(0);

    //Another character will exceed the maximum so the value needs to be the same 
    name.value = "ABCDEFGH";
    name.dispatchEvent(keydownevent);
    expect(spyEvent).toHaveBeenCalledTimes(1);
  });

  it('should prevent the key down when ctrl is pressed', () => {
    
    //Given
    var name = fixture.nativeElement.querySelector(".nametag-edit-content #txtTagName");
    var keydownevent = new KeyboardEvent('keydown', {
      key: 'H', ctrlKey: true
    });
    keydownevent.preventDefault = jasmine.createSpy('preventDefault'),
    
    //When
    name.dispatchEvent(keydownevent);

    //Then
    expect(keydownevent.preventDefault).toHaveBeenCalled();
  });

});
