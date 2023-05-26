import { Component, OnInit, Input } from '@angular/core';
import { NametagTemplate } from 'src/app/models/nametag-template.model';
import { Nametag } from 'src/app/models/nametag.model';
import { AppEventsService } from 'src/app/services/app-events.service';

@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements OnInit {
  @Input() template: NametagTemplate;
  @Input() isEdit: boolean;
  @Input() saveFunction: Function;
  customNameTag: Nametag;
  slug: string="";
  constructor(private readonly appEventsService: AppEventsService) { }

  ngOnInit(): void {
    this.customNameTag = new Nametag({
      firstName: this.template.sampleName,
      profession: this.template.sampleProfession,
      templateSlug: this.template.slug
    });
    this.customNameTag.template = this.template;
    this.slug = this.isEdit ? this.template.slug : "";
  }

  /** Notify the card component the css update */
  refreshTemplate(): void {
    this.appEventsService.NotifyTemplateChanged();
  }


  /** Fill the object and call the save function injected by the parent */
  save() {
    this.template.slug = this.slug;    
    this.template.sampleName = this.customNameTag.firstName;
    this.template.sampleProfession = this.customNameTag.profession;

    this.saveFunction.call(this.customNameTag);
  }

}
