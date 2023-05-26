import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppMessage } from '../shared/error-messages';

@Injectable({
  providedIn: 'root'
})
export class AppEventsService {

  constructor() { }

  /** Subject to show messages to the user */
  public messageSubject = new Subject();

  public templatesChangedSubject = new Subject();

  /**Publish the message to the subscribors in the Subject   
   * @param message the message to be shown to the user
   * @param level the level to render the message area
   */
  public PublishMessage(message:AppMessage){
    this.messageSubject.next(message);
  }


  /** Subject to indicates the template css update in the template editor screen */
  public templateChanged = new Subject();
  
  public NotifyTemplateChanged(){
    this.templateChanged.next(null);
  }
}
