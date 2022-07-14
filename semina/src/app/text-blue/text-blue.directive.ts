import { Directive,ElementRef,Renderer2 } from '@angular/core';

@Directive({
  selector: '[textBlue]'
})
export class TextBlueDirective {
  //ElementRef : view의 native element를 감싸주는 wrapper
  //Render2 : element를 setStyle로 rendering
  constructor(el: ElementRef, renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, 'color', 'blue');
  }
}
