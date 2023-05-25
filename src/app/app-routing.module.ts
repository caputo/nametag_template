import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NametagContainerComponent } from "./nametags/nametag-container/nametag-container.component";
import { NametagCreateComponent } from "./nametags/nametag-create/nametag-create.component";
import { NametagEditComponent } from "./nametags/nametag-edit/nametag-edit.component";
import { NametagListComponent } from "./nametags/nametag-list/nametag-list.component";
import { AppRoutes } from "./shared/app-routes";
import { NametagListResolver } from "./nametags/resolvers/nametag-list.resolver";
import { NametagResolver } from "./nametags/resolvers/nametag.resolver";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplatesListComponent } from "./templates/templates-list/templates-list/templates-list.component";
import { TemplatesListResolver } from "./nametags/resolvers/templates-list.resolver";
import { TemplateCreateComponent } from "./templates/template-create/template-create/template-create.component";
import { TemplateEditResolver } from "./nametags/resolvers/templates-edit.resolver";
import { TemplateEditComponent } from "./templates/template-edit/template-edit.component";
const routes: Routes = [
  { path: "", redirectTo: "nametags" },
  {
    path: AppRoutes.NAMETAG_CONTAINER.path,
    component: NametagContainerComponent,
    children: [
      { path: "", redirectTo: "create" },
      {
        path: AppRoutes.NAMETAG_CREATE.path,
        component: NametagCreateComponent
      },
      {
        path: AppRoutes.NAMETAG_LIST.path,
        component: NametagListComponent,
        resolve: { nametags: NametagListResolver }
      },
      {
        path: AppRoutes.NAMETAG_EDIT.path,
        component: NametagEditComponent,
        resolve: { nametag: NametagResolver }
      },
      {
        path: AppRoutes.TEMPLATE_LIST.path,
        component: TemplatesListComponent,
        resolve: { nametag: TemplatesListResolver }
      },
      {
        path: AppRoutes.TEMPLATE_CREATE.path,
        component: TemplateCreateComponent,
        resolve: { nametag: TemplatesListResolver }
      },
      {
        path: AppRoutes.TEMPLATE_EDIT.path,
        component: TemplateEditComponent,
        resolve: { nametag: TemplateEditResolver }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
