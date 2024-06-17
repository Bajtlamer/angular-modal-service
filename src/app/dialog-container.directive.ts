import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDialogContainer]',
  standalone: true
})
export class DialogContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
    console.log('DialogContainerDirective initialized');
  }
}
