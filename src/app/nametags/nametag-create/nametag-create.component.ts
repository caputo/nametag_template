import { Component, OnInit } from "@angular/core";
import { NametagService } from "../../services/nametag.service";
import { Nametag } from "../../models/nametag.model";
import { NavigationService } from "../../services/navigation.service";
import { ActivatedRoute } from "@angular/router";

/**
 * This is the page where a user can create a brand-new
 * nametag by choosing one of the nametag templates. There's
 * no limit on the number of nametags a user is allowed to create.
 */
@Component({
  selector: "app-nametag-create",
  templateUrl: "./nametag-create.component.html",
  styleUrls: ["./nametag-create.component.scss"]
})
export class NametagCreateComponent implements OnInit {  
  sampleNametag :Nametag[];
  constructor(
    private readonly nametagService: NametagService,
    private readonly navigation: NavigationService,  
    private readonly activatedRoute: ActivatedRoute  
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.sampleNametag = [];
      for(let template of data.templates){
        this.sampleNametag.push(new Nametag({firstName:template.sampleName,profession:template.sampleProfession,templateSlug:template.slug}));      
      }       
    });
  }

  /**
   * Creates a brand new nametag with the given template.
   */
  async createNametag(nametag: Nametag): Promise<void> {
    let template = nametag.template;
    let newNametag = new Nametag({ templateSlug: template.slug });
    try {
      // Always use data coming from server over local data.
      newNametag = await this.nametagService.createNametag(newNametag);
      await this.navigation.goToNametagEdit(newNametag.id);
    } catch (e) {
      // Strictly for the purposes of this take-home challenge we
      // don't have to worry about error handling (see documentation).
    }
  }
}
