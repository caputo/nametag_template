import { Component, OnInit,Input } from '@angular/core';
import { NametagTemplate } from 'src/app/models/nametag-template.model';
import { AppRoutes } from 'src/app/shared/app-routes';
import { ActivatedRoute, Router } from "@angular/router";
import { NametagTemplatesService } from 'src/app/services/nametag-templates.service';
import {Subscription} from 'rxjs';
import { AppEventsService } from 'src/app/services/app-events.service';
import { AppMessagesDefault, MessageLevel } from 'src/app/shared/error-messages';

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.scss']
})
export class TemplateEditComponent implements OnInit{

  @Input() template:NametagTemplate;
  AppRoutes = AppRoutes;
  private routeDataSub: Subscription;  

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly templatesService: NametagTemplatesService, 
    private readonly router:Router,
    private readonly appEventsService:AppEventsService) {

     }
  ngOnInit(): void {
    this.routeDataSub = this.activatedRoute.data.subscribe((data: any) => {
      this.template = data.nametag;
    });
  }

  update(){    
    this.templatesService.update(this.template).then((data)=>{
      this.router.navigate(AppRoutes.TEMPLATE_LIST.buildFragments());
      this.appEventsService.PublishMessage({message:AppMessagesDefault.UPDATE_TEMPLATE_SUCESS, level: MessageLevel.INFO});
    },(error) => {
      this.appEventsService.PublishMessage({message:error, level: MessageLevel.INFO});
    });
  }

}
