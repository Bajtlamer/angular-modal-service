import { Injectable, ComponentRef, Type, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogCloseSubject = new Subject<void>();
  private dialogContainerRef: ViewContainerRef | null = null;
  private activeComponentRef: ComponentRef<any> | null = null;
  public isDialogActive = false;

  constructor() {
    this.dialogCloseSubject.subscribe(() => {
      if (this.activeComponentRef) {
        this.closeDialog(this.activeComponentRef);
      }
    });
  }

  setViewContainerRef(vcr: ViewContainerRef) {
    console.log('ViewContainerRef set');
    this.dialogContainerRef = vcr;
  }

  openDialog<T>(component: Type<T>, config?: Partial<T>): void {
    if (!this.dialogContainerRef) {
      throw new Error('Dialog container ViewContainerRef is not set.');
    }

    const componentRef: ComponentRef<T> = this.dialogContainerRef.createComponent(component);
    this.activeComponentRef = componentRef;
    this.isDialogActive = true;

    if (config) {
      Object.assign(componentRef.instance as any, config);
    }

    console.log('Dialog opened with component:', component, 'and config:', config);
  }

  closeDialog<T>(componentRef: ComponentRef<T>): void {
    console.log('Closing dialog');
    componentRef.destroy();
    this.activeComponentRef = null;
    this.isDialogActive = false;
  }

  close() {
    console.log('Emitting close event');
    this.dialogCloseSubject.next();
  }
}
