import { Component, OnInit,Input,OnDestroy } from '@angular/core';
import { NametagTemplate } from 'src/app/models/nametag-template.model';
import { AppRoutes } from 'src/app/shared/app-routes';
import { ActivatedRoute, Router } from "@angular/router";
import { NametagTemplatesService } from 'src/app/services/nametag-templates.service';
import {Subscription} from 'rxjs';
import { AppEventsService } from 'src/app/services/app-events.service';
import { AppMessagesDefault, MessageLevel } from 'src/app/shared/error-messages';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.scss']
})
export class TemplateEditComponent implements OnInit, OnDestroy{

  @Input() template:NametagTemplate;
  AppRoutes = AppRoutes;
  private routeDataSub: Subscription;  

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly templatesService: NametagTemplatesService, 
    private readonly navigationService:NavigationService,
    private readonly appEventsService:AppEventsService) {

     }
  ngOnInit(): void {
    this.routeDataSub = this.activatedRoute.data.subscribe((data: any) => {
      this.template = data.template;
    });
  }
  ngOnDestroy(): void {
    this.routeDataSub.unsubscribe();
  }

  //Update the template and send message
  update(){    
    this.templatesService.update(this.template).then((data)=>{      
      this.appEventsService.PublishMessage({message:AppMessagesDefault.UPDATE_TEMPLATE_SUCESS, level: MessageLevel.INFO});
      this.navigationService.goToTemplatesList();
    },(error) => {
      this.appEventsService.PublishMessage({message:error, level: MessageLevel.ERROR});
    });
  }

}
