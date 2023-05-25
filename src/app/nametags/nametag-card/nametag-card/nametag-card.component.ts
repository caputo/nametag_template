import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Nametag } from '../../../models/nametag.model';
import { NametagTemplate } from 'src/app/models/nametag-template.model';

import { NametagTemplatesService } from 'src/app/services/nametag-templates.service';
import { AppEventsService } from 'src/app/services/app-events.service';

@Component({
  selector: 'app-nametag-card',
  templateUrl: './nametag-card.component.html',
  styleUrls: ['./nametag-card.component.scss']
})
export class NametagCardComponent implements OnInit{

  @Input() nametag: Nametag;
  @Input() editEnabled:boolean = false;    

  constructor(private readonly appEventsService: AppEventsService) { }
  
  ngOnInit(): void {

    this.writeStyles(this.nametag.template);      

    /** Listen to the event to update the layout when changing the template css */
    this.appEventsService.templateChanged.subscribe(()=>{
      this.writeStyles(this.nametag.template);      
    });
  }

  /**Method responsible to write the css class in the document
   * In case the class alredy exists it will replace the css class
  */
  private writeStyles(template:NametagTemplate):void{

    //Chech if the style was already added to the document and remove it 
    if (document.getElementById(template.slug))
    {
      document.getElementsByTagName('head')[0].removeChild(document.getElementById(template.slug));
    }

    //Create the style and adds to the document
    let styleElement = document.createElement('style');    
    styleElement.id = template.slug;
    styleElement.innerHTML = `.${template.slug} { ${template.cssStyle} }`;
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }

  //This method calculates the max length  that fits in the input
  onKeyDownCheckLength(e):void{
    //Get the style and size from the input
    var target = e.target || e.srcElement;
    var style = getComputedStyle(target);
    var maxWidth = target.getBoundingClientRect().width;

    if(e.ctrlKey || e.altKey) return;
    if(e.key && e.key.length===1) {
      //Create a span to simulate and measures if it fits
      var sizeTest = document.createElement('span');        
      sizeTest.style.font = style.font;
      sizeTest.style.textTransform = style.textTransform;
      sizeTest.style.letterSpacing = style.letterSpacing;
      sizeTest.textContent = target.value + e.key;
      document.body.append(sizeTest);
      var w = sizeTest.getBoundingClientRect().width;
      sizeTest.remove();      
      //If exceeds block the entering      
      if(w>maxWidth) e.preventDefault();
    }
  }
}
