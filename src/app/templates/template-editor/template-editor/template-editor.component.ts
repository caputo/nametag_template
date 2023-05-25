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
  constructor(private readonly appEventsService:AppEventsService) { }

  ngOnInit(): void {
    this.customNameTag = new Nametag({
      firstName:this.template.sampleName,
      profession:this.template.sampleProfession,
      templateSlug:"TemplateEditor"  
    });
    this.customNameTag.template = this.template;
  }

  /** Notify the card component the css update */
  refreshTemplate():void{
    this.appEventsService.notifyTemplateChanged();
  }

  save(){
    this.template.id = this.template.slug;
    this.template.sampleName = this.customNameTag.firstName;
    this.template.sampleProfession = this.customNameTag.profession;

    //Call the save function injected by the parent
    this.saveFunction.call(this.customNameTag);
  }

}
