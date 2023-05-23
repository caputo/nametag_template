import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutes } from "./app-routes";

/**
 * A utility service that centralizes navigation to different parts
 * of the app. Always use this instead of using router.navigate.
 *
 * Note: You should still use [routerLink] in templates instead
 * of this.
 */
@Injectable({
  providedIn: "root"
})
export class NavigationService {
  constructor(private readonly router: Router) {}

  /**
   * Navigates to the page to edit and render a single nametag.
   * @param nametagId The ID of the nametag we'd like to edit.
   */
  goToNametagEdit(nametagId: string): Promise<boolean> {
    return this.router.navigate(
      AppRoutes.NAMETAG_EDIT.buildFragments(nametagId)
    );
  }

  /**
   * Navigates to the page to create brand new nametags.
   */
  goToNametagCreate(): Promise<boolean> {
    return this.router.navigate(AppRoutes.NAMETAG_CREATE.buildFragments());
  }

  /**
   * Navigates to the page where a user can see all the nametags
   * they've created.
   */
  goToNametagList(): Promise<boolean> {
    return this.router.navigate(AppRoutes.NAMETAG_LIST.buildFragments());
  }
}
