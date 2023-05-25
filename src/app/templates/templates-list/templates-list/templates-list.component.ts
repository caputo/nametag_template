import { Component, OnInit } from '@angular/core';
import { NametagTemplate } from 'src/app/models/nametag-template.model';
import { AppRoutes } from 'src/app/shared/app-routes';
import { ActivatedRoute } from "@angular/router";
import {Subscription} from "rxjs";
import { Nametag } from 'src/app/models/nametag.model';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {

  AppRoutes = AppRoutes;
  templates: NametagTemplate[];
  nameTagTemplates: Nametag[];

  private routeDataSub: Subscription;
  constructor(private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeDataSub = this.activatedRoute.data.subscribe((data: any) => {
      this.templates = data.nametag;
      this.nameTagTemplates = this.templates.map(s=>this.createSampleNameTag(s));
    })
  }

  private createSampleNameTag(template:NametagTemplate){
    return new Nametag({
      firstName: template.sampleName,
      profession: template.sampleProfession,
      templateSlug:template.slug
    });
  }
}
