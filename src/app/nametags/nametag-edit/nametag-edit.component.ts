import { Component, OnInit } from "@angular/core";
import { ActivatedRoute,Router } from "@angular/router";
import { AppRoutes } from "../../shared/app-routes";
import { Nametag } from "../nametag.model";
import { NametagService } from "../nametag.service";
import { NametagTemplates } from "../nametag-templates";
import { NametagTemplate } from "../nametag-templates";
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
export class NametagEditComponent implements OnInit {
  nametag: Nametag; 
  AppRoutes = AppRoutes;
  
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router:Router,
    // Need to append "Service" to end of name to avoid naming conflict with property.
    // TODO: Interact with nametag-service.ts to save any changes made to the nametag.
    private readonly nametagService: NametagService,    
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.nametag = data.nametag;            
    });
  }

  save():void{
    this.nametagService.updateNametag(this.nametag).then((value)=>{
      this.router.navigate(AppRoutes.NAMETAG_LIST.buildFragments());
    });
  }
}
