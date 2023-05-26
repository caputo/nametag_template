import { Component, OnInit} from '@angular/core';
import { NametagTemplate } from 'src/app/models/nametag-template.model';
import { AppRoutes } from 'src/app/shared/app-routes';
import {Subscription} from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { NametagTemplatesService } from 'src/app/services/nametag-templates.service';
import { NametagTemplatesDefault } from 'src/app/models/nametag-templates-default';
import { AppEventsService } from 'src/app/services/app-events.service';
import { AppMessagesDefault, MessageLevel } from 'src/app/shared/error-messages';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.scss']
})
export class TemplateCreateComponent implements OnInit {

  AppRoutes = AppRoutes;
  template:NametagTemplate;  
  
  constructor(
    private readonly templatesService: NametagTemplatesService, 
    private readonly navigationService:NavigationService,
    private readonly appEventsService:AppEventsService) { }

  ngOnInit(): void {       
      this.template = new NametagTemplate();
      this.template.slug = "TemplateEditor";
      this.template.cssStyle = NametagTemplatesDefault.ClearCSS;    
  }

  /**Save the template and send message */
  save(){    
    if(!this.template.slug){
      this.appEventsService.PublishMessage({message:AppMessagesDefault.CREATE_TEMPLATE_ALERT_FIELD, level:MessageLevel.WARNING});
      return;
    }
    this.template.id = this.template.slug;
    this.templatesService.create(this.template).then((data)=>{
      this.appEventsService.PublishMessage({message:AppMessagesDefault.CREATE_TEMPLATE_SUCESS, level:MessageLevel.INFO});
      this.navigationService.goToTemplatesList();      
    }, (error)=>{
      this.appEventsService.PublishMessage({message:error, level:MessageLevel.ERROR});
    });
  }

}

