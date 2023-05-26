import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NametagEditComponent } from "./nametag-edit.component";
import { NametagEditComponentPageSpec } from "./nametag-edit.component.page.spec";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { MockNametagData } from "../../models/mock-nametag.data";
import { NametagService } from "../../services/nametag.service";
import { AppEventsService } from "src/app/services/app-events.service";
import { AppMessagesDefault, MessageLevel } from "src/app/shared/error-messages";
import { NametagTemplatesDefault } from "src/app/models/nametag-templates-default";
import { NametagCardComponent } from "../nametag-card/nametag-card.component";

describe("NametagEditComponent", () => {
  let component: NametagEditComponent;
  let fixture: ComponentFixture<NametagEditComponent>;
  let page: NametagEditComponentPageSpec;
  let nametagService: jasmine.SpyObj<NametagService>;
  let appEventsService: jasmine.SpyObj<AppEventsService>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NametagEditComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: ({
            data: of({ nametag:[NametagTemplatesDefault.getAllTemplates, {...MockNametagData.nametag, template:NametagTemplatesDefault.SLEEK}]})
          } as any) as ActivatedRoute
        },
        {
          provide: NametagService,
          useValue: jasmine.createSpyObj("NametagService", ["updateNametag"])
        },
        {
          provide:AppEventsService, 
          useValue: jasmine.createSpyObj("AppEventsService", ["PublishMessage"])
        }
      ]
    }).compileComponents(); 
  });

  beforeEach(() => {
    nametagService = TestBed.inject(NametagService) as jasmine.SpyObj<
      NametagService
    >;
    appEventsService = TestBed.inject(AppEventsService) as jasmine.SpyObj<AppEventsService>;
    fixture = TestBed.createComponent(NametagEditComponent);
    component = fixture.componentInstance;    
    page = new NametagEditComponentPageSpec(fixture);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call update and send message", async() => {

    //Given
    nametagService.updateNametag.and.returnValue(
      Promise.resolve(MockNametagData.nametag)
    );
    fixture.detectChanges();
    const btnSave = page.getSaveButton;

    //When
    await btnSave.click();

    //Then
    expect(nametagService.updateNametag).toHaveBeenCalled();
    expect(appEventsService.PublishMessage).toHaveBeenCalledWith({message:AppMessagesDefault.UPDATE_NAMETAG_SUCESSFULL, level:MessageLevel.INFO});
    expect(component).toBeTruthy();
  });

  it("should send error message when fails", async() => {

    //Given
    nametagService.updateNametag.and.returnValue(
      Promise.reject("Unit Test Error")
    );

    //When
    var btnSave = page.getSaveButton;
    await btnSave.click();

    //Then
    expect(nametagService.updateNametag).toHaveBeenCalled();
    expect(appEventsService.PublishMessage).toHaveBeenCalledWith({message:"Unit Test Error", level:MessageLevel.ERROR});
  });
});
