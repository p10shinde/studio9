import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDetailsActiveRow]'
})
export class DetailsActiveRowDirective {

  //   @HostBinding('class')
  // elementClass = 'billActive'
  constructor(el: ElementRef) {
    // el.nativeElement.style.backgroundColor = 'yellow';
  }

}
