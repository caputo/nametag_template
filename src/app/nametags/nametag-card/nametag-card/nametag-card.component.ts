import { Component, OnInit, Input } from '@angular/core';
import { Nametag } from '../../nametag.model';
import { NametagTemplate, NametagTemplates } from '../../nametag-templates';

@Component({
  selector: 'app-nametag-card',
  templateUrl: './nametag-card.component.html',
  styleUrls: ['./nametag-card.component.scss']
})
export class NametagCardComponent implements OnInit {

  @Input() nametag: Nametag;
  readonly allNametagTemplates: NametagTemplate[] = NametagTemplates.getAllTemplates();
  showProfession:boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.writeStyles(this.nametag.templateSlug, this.allNametagTemplates.find(s=>s.slug === this.nametag.templateSlug).cssStyle);      
  }

  writeStyles(styleName, cssText):void{
    var styleElement = document.getElementById(styleName);
    if (styleElement) document.getElementsByTagName('head')[0].removeChild(
        styleElement);
    styleElement = document.createElement('style');    
    styleElement.id = styleName;
    styleElement.innerHTML = `.${styleName} { ${cssText} }`;
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  onKeyDownCheckLength(e):void{
    var target = e.target || e.srcElement;
    var style = getComputedStyle(target);
    var maxWidth = target.getBoundingClientRect().width;
    var sizeTest = document.createElement('span');
    // set font for span to match input
    sizeTest.style.font = style.font;
    sizeTest.style.textTransform = style.textTransform;
    sizeTest.style.letterSpacing = style.letterSpacing;
    if(e.ctrlKey || e.altKey) return;
    if(e.key && e.key.length===1) {
      sizeTest.textContent = target.value + e.key;
      document.body.append(sizeTest);
      var w = sizeTest.getBoundingClientRect().width;
      sizeTest.remove();      
      if(w>maxWidth) e.preventDefault();
    }
  }
}
