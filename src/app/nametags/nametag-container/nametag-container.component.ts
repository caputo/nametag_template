import { Component, OnInit } from "@angular/core";
import { AppRoutes } from "../../shared/app-routes";

/**
 * Serves as the navigation header for all nametags
 * pages. It presents a unified chrome across the whole
 * experience.
 */
@Component({
  selector: "app-nametag-container",
  templateUrl: "./nametag-container.component.html",
  styleUrls: ["./nametag-container.component.scss"]
})
export class NametagContainerComponent implements OnInit {
  readonly AppRoutes = AppRoutes;

  constructor() {}

  ngOnInit(): void {}
}
