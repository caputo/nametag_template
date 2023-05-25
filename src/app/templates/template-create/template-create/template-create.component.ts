import { Component, OnInit } from '@angular/core';
import { NametagTemplate } from 'src/app/models/nametag-template.model';
import { AppRoutes } from 'src/app/shared/app-routes';
import {Subscription} from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { NametagTemplatesService } from 'src/app/services/nametag-templates.service';
import { NametagTemplatesDefault } from 'src/app/models/nametag-templates-default';
import { AppEventsService } from 'src/app/services/app-events.service';
import { AppMessagesDefault, MessageLevel } from 'src/app/shared/error-messages';

@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.scss']
})
export class TemplateCreateComponent implements OnInit {

  AppRoutes = AppRoutes;
  template:NametagTemplate;  
  private routeDataSub: Subscription;  
  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly templatesService: NametagTemplatesService, 
    private readonly router:Router,
    private readonly appEventsService:AppEventsService) { }

  ngOnInit(): void {
    this.routeDataSub = this.activatedRoute.data.subscribe((data: any) => {
      this.template = new NametagTemplate();
      this.template.cssStyle = NametagTemplatesDefault.ClearCSS;
    });
  }

  save(){    
    this.templatesService.create(this.template).then((data)=>{
      this.router.navigate(AppRoutes.TEMPLATE_LIST.buildFragments());
      this.appEventsService.PublishMessage({message:AppMessagesDefault.CREATE_TEMPLATE_SUCESS, level:MessageLevel.INFO});
    }, (error)=>{
      this.appEventsService.PublishMessage({message:error, level:MessageLevel.ERROR});
    });
  }

}

