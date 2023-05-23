import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Nametag } from "../nametag.model";
import { NametagService } from "../nametag.service";

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

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    // Need to append "Service" to end of name to avoid naming conflict with property.
    // TODO: Interact with nametag-service.ts to save any changes made to the nametag.
    private readonly nametagService: NametagService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.nametag = data.nametag;
    });
  }
}
