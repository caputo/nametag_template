import { TestBed } from '@angular/core/testing';

import { AppEventsService } from './app-events.service';
import { MessageLevel } from '../shared/error-messages';
import { Subject } from 'rxjs';

describe('AppEventsService', () => {
  let service: AppEventsService;

  beforeEach(() => {    
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should publish message', () => {
    //Given
    service.messageSubject = new Subject();    
    const message = {message:'teste',level:MessageLevel.INFO}
    let isCalled = false;
    service.messageSubject.subscribe((message)=>{
      isCalled = true; 
    });

    //When
    service.PublishMessage(message); 

    //Then
    expect(isCalled).toBeTruthy();
  });

  
  it('should notify', () => {
    //Given
    let isCalled = false;
    service.templateChanged = new Subject();
    service.templateChanged.subscribe(()=>{
      isCalled = true;
    })
    //When
    service.NotifyTemplateChanged();

    //Then
    expect(isCalled).toBeTruthy();
  });

});
