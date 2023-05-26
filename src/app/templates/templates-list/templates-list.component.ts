import { Component, OnDestroy, OnInit } from '@angular/core';
import { NametagTemplate } from '../../models/nametag-template.model';
import { AppRoutes } from '../../shared/app-routes';
import { ActivatedRoute } from "@angular/router";
import {Subscription} from "rxjs";
import { Nametag } from '../../models/nametag.model';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit, OnDestroy {

  AppRoutes = AppRoutes;
  templates: NametagTemplate[];
  nameTagTemplates: Nametag[];

  private routeDataSub: Subscription;
  constructor(private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeDataSub = this.activatedRoute.data.subscribe((data: any) => {
      this.templates = data.templates;
      this.nameTagTemplates = this.templates.map(s=>this.createSampleNameTag(s));
    })
  }

  ngOnDestroy(): void {
    this.routeDataSub.unsubscribe();
  }

  private createSampleNameTag(template:NametagTemplate){
    return new Nametag({
      firstName: template.sampleName,
      profession: template.sampleProfession,
      templateSlug:template.slug
    });
  }
}
