import { Injectable } from '@angular/core';
import { GenericLocalStorageService } from './generic-localstorage-service';
import { NametagTemplate } from '../models/nametag-template.model';
import { LocalStorageService, StorageKey } from '../services/local-storage.service';
import { AppMessagesDefault } from '../shared/error-messages';
import { NametagTemplatesDefault } from '../models/nametag-templates-default';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NametagTemplatesService extends GenericLocalStorageService<NametagTemplate> 
{

  constructor(localStorageService:LocalStorageService) {
       super(localStorageService,
       StorageKey.NametagsTemplates,
       AppMessagesDefault.CREATE_DUPLICATE_NAMETAG_TEMPLATE,
       AppMessagesDefault.UPDATE_NONEXISTENT_NAMETAG_TEMPLATE,
       AppMessagesDefault.FETCH_NONEXISTENT_NAMETAG_TEMPLATE);

       this.dataChanged.subscribe((data:NametagTemplate[]) => {
        NametagTemplatesService.templates = data;
      });

       //Check if there is some data storaged in the current browser if not save the defaults
       this.list().then((templates) => {
        if(templates.length===0){
          var templatesDefault = NametagTemplatesDefault.getAllTemplates();
          for(let template of templatesDefault)
          {
            this.create(template);
          }
        }        
       });

  }
  
  //Provides a static way to anyone acesss the data without the need to inject the class
  static templates:NametagTemplate[];
  static getTemplateWithSlug(slug: string) {
    return this.templates?.find(t => t.slug === slug);
  }
}
