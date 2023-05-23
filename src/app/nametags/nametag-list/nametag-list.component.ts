import {Component, OnDestroy, OnInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Nametag } from "../nametag.model";
import { AppRoutes } from "../../shared/app-routes";
import {Subscription} from "rxjs";

/**
 * Displays all the nametags a user has created and
 * allows the user to click through to edit any one of them.
 */
@Component({
  selector: "app-nametag-list",
  templateUrl: "./nametag-list.component.html",
  styleUrls: ["./nametag-list.component.scss"]
})
export class NametagListComponent implements OnInit,OnDestroy {
  AppRoutes = AppRoutes;
  nametags: Nametag[];

  private routeDataSub: Subscription;

  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeDataSub = this.activatedRoute.data.subscribe((data: any) => {
      this.nametags = data.nametags;
    });
  }

  ngOnDestroy() {
    this.routeDataSub.unsubscribe();
  }
}
