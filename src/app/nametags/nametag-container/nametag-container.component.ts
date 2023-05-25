import { Component, OnInit} from "@angular/core";
import { AppRoutes } from "../../shared/app-routes";
import { AppMessage, MessageLevel } from "src/app/shared/error-messages";
import { AppEventsService } from "src/app/services/app-events.service";

/**
 * Serves as the navigation header for all nametags
 * pages. It presents a unified chrome across the whole
 * experience.
 */
@Component({  
  selector: "app-nametag-container",
  templateUrl: "./nametag-container.component.html",
  styleUrls: ["./nametag-container.component.scss"
  ]
})
export class NametagContainerComponent implements OnInit {
  readonly AppRoutes = AppRoutes;
  showMessage:boolean = true;
  message:AppMessage;

  constructor(private readonly appEventsService:AppEventsService) {
    this.appEventsService.messageSubject.subscribe((data:AppMessage)=>this.showMessageHandler(data));
  }

  /** Show the message an disapear after 5 seconds */
  private showMessageHandler(data:AppMessage){
    this.message = data; 
    this.showMessage = true;    
    setTimeout(() => {
      this.showMessage = false;      
    }, 5000);
    
  }

  ngOnInit(): void {}
}
