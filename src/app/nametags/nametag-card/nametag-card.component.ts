import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Nametag } from '../../models/nametag.model';
import { NametagTemplate } from '../../models/nametag-template.model';
import { AppEventsService } from '../../services/app-events.service';

@Component({
  selector: 'app-nametag-card',
  templateUrl: './nametag-card.component.html',
  styleUrls: ['./nametag-card.component.scss']
})
export class NametagCardComponent implements OnInit {

  @Input() nametag: Nametag;
  @Input() editEnabled: boolean = false;

  constructor(private readonly appEventsService: AppEventsService) { }

  ngOnInit(): void {
    this.writeStyles(this.nametag.template);

    /** Listen to the event to update the layout when changing the template css */
    this.appEventsService.templateChanged.subscribe(() => this.handleTemplateChanged());
  }

  /**Method responsible to write the css class in the document
   * In case the class alredy exists it will replace the css class
  */
  writeStyles(template: NametagTemplate): void {

    //Chech if the style was already added to the document and remove it 
    if (document.getElementById(template.slug)) {
      document.getElementsByTagName('head')[0].removeChild(document.getElementById(template.slug));
    }

    //Create the style and adds to the document
    let styleElement = document.createElement('style');
    styleElement.id = template.slug;
    styleElement.innerHTML = `.${template.slug} { ${template.cssStyle} }`;
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }

  //This method calculates the max length  that fits in the input
  onKeyDownCheckLength(e): void {
    //Get the style and size from the input
    const target = e.target;    
    const style = getComputedStyle(target);
    const maxWidth = target.getBoundingClientRect().width;

    if (e.ctrlKey || e.altKey) {
      e.preventDefault();
      return;
    }
    if (e.key && e.key.length === 1) {
      //Create a span to simulate and measures if it fits
      let sizeTest = document.createElement('span');
      sizeTest.style.font = style.font;
      sizeTest.style.textTransform = style.textTransform;
      sizeTest.style.letterSpacing = style.letterSpacing;
      sizeTest.textContent = target.value + e.key;
      document.body.append(sizeTest);
      const w = sizeTest.getBoundingClientRect().width;
      sizeTest.remove();
      //If exceeds block the entering      
      if (w > maxWidth) e.preventDefault();
    }
  }
  
  handleTemplateChanged(): void {
    this.writeStyles(this.nametag.template);
  }
}
