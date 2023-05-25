import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ChangeDetectorRef } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NametagCreateComponent } from "./nametags/nametag-create/nametag-create.component";
import { NametagEditComponent } from "./nametags/nametag-edit/nametag-edit.component";
import { NametagListComponent } from "./nametags/nametag-list/nametag-list.component";
import { NametagContainerComponent } from "./nametags/nametag-container/nametag-container.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NametagCardComponent } from './nametags/nametag-card/nametag-card/nametag-card.component';
import { TemplatesListComponent } from './templates/templates-list/templates-list/templates-list.component';
import { TemplateEditorComponent } from './templates/template-editor/template-editor/template-editor.component';
import { TemplateCreateComponent } from './templates/template-create/template-create/template-create.component';
import { TemplateEditComponent } from './templates/template-edit/template-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NametagContainerComponent,
    NametagCreateComponent,
    NametagEditComponent,
    NametagListComponent,
    NametagCardComponent,
    TemplatesListComponent,
    TemplateEditorComponent,
    TemplateCreateComponent,
    TemplateEditComponent    
  ],
  imports: [AppRoutingModule, BrowserModule, CommonModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
