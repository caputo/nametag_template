import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NametagCreateComponent } from "./nametags/nametag-create/nametag-create.component";
import { NametagEditComponent } from "./nametags/nametag-edit/nametag-edit.component";
import { NametagListComponent } from "./nametags/nametag-list/nametag-list.component";
import { NametagContainerComponent } from "./nametags/nametag-container/nametag-container.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    NametagContainerComponent,
    NametagCreateComponent,
    NametagEditComponent,
    NametagListComponent
  ],
  imports: [AppRoutingModule, BrowserModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
