import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";

import { NametagContainerComponent } from "./nametag-container.component";
import { NametagContainerComponentPageSpec } from "./nametag-container.component.page.spec";
import { RouterTestingModule } from "@angular/router/testing";
import { AppEventsService } from "src/app/services/app-events.service";
import { Subject } from 'rxjs';
import { AppMessage, MessageLevel } from "src/app/shared/error-messages";

describe("NametagContainerComponent", () => {
  let component: NametagContainerComponent;
  let fixture: ComponentFixture<NametagContainerComponent>;
  let page: NametagContainerComponentPageSpec;
  let appEventsService: Partial<AppEventsService>;

  beforeEach(async () => {
    appEventsService = {
      messageSubject: new Subject()
    };
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: AppEventsService,
          useValue: appEventsService
        }
      ],
      declarations: [NametagContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NametagContainerComponent);
    component = fixture.componentInstance;
    page = new NametagContainerComponentPageSpec(fixture);
    fixture.detectChanges();
  });

  it("should display link to nametag create page", () => {
    expect(page.nametagCreateLink).toBeTruthy();
  });

  it("should display link to nametag list page", () => {
    expect(page.nametagListLink).toBeTruthy();
  });

  it("should display message", () => {    
    //When
    component.ngOnInit();
    appEventsService.messageSubject.next({ message: 'unittest', level: MessageLevel.ERROR });
    fixture.detectChanges();
    fixture.whenStable();

    //Then
    expect(page.errorMessageSpan).toBeTruthy();
    expect(page.errorMessageSpan.textContent).toBe('unittest');
  });

  it("should disapear message after", fakeAsync(() => {
    //When
    component.ngOnInit();
    appEventsService.messageSubject.next({ message: 'unittest', level: MessageLevel.ERROR });
    fixture.detectChanges();

    //Then
    expect(page.errorMessageSpan).toBeTruthy();
    tick(5000);
    fixture.detectChanges();
    expect(page.errorMessageSpan).toBeNull();
  }));
}); 
