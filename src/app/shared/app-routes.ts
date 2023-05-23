export interface AppRoute {
  // The path that's to be specified in a routing module.
  path: string;

  // Builds the absolute URL fragments for the URL. Can be used
  // directly in router.navigate calls and [routerLink].
  buildFragments: (...args: any) => string[];

  // The class that should be applied to all <a> elements linking
  // to this page. It's useful for testing purposes.
  linkClass: string;
}

/**
 * A single place to store all information about the routes in our app.
 * This makes searching for usages of the different routes throughout
 * the app way easier. Never manually type out a URL fragment
 * (like "list" or "create").
 */
export class AppRoutes {
  public static NAMETAG_CONTAINER: AppRoute = {
    path: "nametags",
    buildFragments: () => ["/", "nametags"],
    linkClass: "nametag-container"
  };

  public static NAMETAG_CREATE: AppRoute = {
    path: "create",
    buildFragments: () => ["/", AppRoutes.NAMETAG_CONTAINER.path, "create"],
    linkClass: "nametag-create"
  };

  public static NAMETAG_LIST: AppRoute = {
    path: "list",
    buildFragments: () => ["/", AppRoutes.NAMETAG_CONTAINER.path, "list"],
    linkClass: "nametag-list"
  };

  public static NAMETAG_EDIT: AppRoute = {
    path: ":nametagId/edit",
    buildFragments: (nametagId: string) => [
      "/",
      AppRoutes.NAMETAG_CONTAINER.path,
      nametagId,
      "edit"
    ],
    linkClass: "nametag-edit"
  };
}
