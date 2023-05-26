import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute,Router } from "@angular/router";
import { AppRoutes } from "../../shared/app-routes";
import { Nametag } from "../../models/nametag.model";
import { NametagService } from "../../services/nametag.service";
import { AppEventsService } from "src/app/services/app-events.service";
import { AppMessagesDefault, MessageLevel } from "src/app/shared/error-messages";
import { Subscription } from "rxjs";
import { NavigationService } from "src/app/services/navigation.service";
/**
 * A page where a user can change the template of the given nametag,
 * edit all the data associated with the nametag, and view the
 * final nametag as it's supposed to be rendered.
 *
 * TODO: Build this component!
 */
@Component({
  selector: "app-nametag-edit",
  templateUrl: "./nametag-edit.component.html",
  styleUrls: ["./nametag-edit.component.scss"]
})
export class NametagEditComponent implements OnInit, OnDestroy {
  nametag: Nametag; 
  AppRoutes = AppRoutes;
  routeSub:Subscription;
  constructor(
    private readonly activatedRoute: ActivatedRoute,    
    private readonly router:Router,
    // Need to append "Service" to end of name to avoid naming conflict with property.
    // TODO: Interact with nametag-service.ts to save any changes made to the nametag.
    private readonly nametagService: NametagService,
    private readonly appEventsService: AppEventsService ,
    private readonly navigationService: NavigationService   
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.data.subscribe((data: any) => {
      this.nametag = data.nametag[1];            
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  /**
   * Save the nametag in the localstorage
   */
  save():void{
    this.nametagService.updateNametag(this.nametag).then((value)=>{
      this.appEventsService.PublishMessage({message:AppMessagesDefault.UPDATE_NAMETAG_SUCESSFULL, level:MessageLevel.INFO});
      this.navigationService.goToNametagList();
    },(error)=>{
      this.appEventsService.PublishMessage({message:error, level:MessageLevel.ERROR});
    });
  }
}
