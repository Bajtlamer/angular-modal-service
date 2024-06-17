import {
  Injectable,
  ComponentRef,
  Type,
  ApplicationRef,
  Injector,
  createComponent,
  EnvironmentInjector,
} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogCloseSubject = new Subject<void>();
  private activeDialogComponentRef: ComponentRef<DialogComponent> | null = null;
  private activeContentComponentRef: ComponentRef<any> | null = null;
  public isDialogActive = false;
  private dialogResultSubject = new Subject<any>();

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private environmentInjector: EnvironmentInjector
  ) {
    this.dialogCloseSubject.subscribe((result) => {
      this.closeDialog(result);
    });
  }

  openDialog<T>(component: Type<T>, config?: Partial<T>): Observable<any> {
    if (this.isDialogActive) {
      this.closeDialog(null);
    }

    const dialogComponentRef = this.createDialogComponent();

    if (!dialogComponentRef) {
      throw new Error('Dialog component creation failed.');
    }

    this.activeDialogComponentRef = dialogComponentRef;
    this.activeDialogComponentRef.instance.config = config;
    this.isDialogActive = true;

    // Wait for the view to be initialized
    setTimeout(() => {
      const viewContainerRef = dialogComponentRef.instance.viewContainerRef;

      if (!viewContainerRef) {
        console.error('viewContainerRef is not available');
        return;
      }

      const componentRef = createComponent(component, {
        environmentInjector: this.environmentInjector,
        projectableNodes: [[]]
      });

      viewContainerRef.insert(componentRef.hostView);

      if (config) {
        Object.assign(componentRef.instance as any, config);
      }

      this.activeContentComponentRef = componentRef;

      // console.log('Dialog opened with component:', component, 'and config:', config);
    });

    return this.dialogResultSubject.asObservable();
  }

  private createDialogComponent(): ComponentRef<DialogComponent> | null {
    const componentRef = createComponent(DialogComponent, {
      environmentInjector: this.environmentInjector,
    });

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    componentRef.instance.onClose.subscribe(result => {
      this.dialogResultSubject.next(result);
      this.dialogResultSubject.complete();
      // this.dialogCloseSubject.next(result);
      // this.dialogCloseSubject.complete();
      this.closeDialog(result);
    });

    return componentRef;
  }

  closeDialog(result?: any) {
    console.log('service.closeDialog: ', result);

    if (this.activeContentComponentRef) {
      this.activeContentComponentRef.destroy();
      this.activeContentComponentRef = null;
    }

    if (this.activeDialogComponentRef) {
      this.appRef.detachView(this.activeDialogComponentRef.hostView);
      this.activeDialogComponentRef.destroy();
      this.activeDialogComponentRef = null;
    }

    this.isDialogActive = false;

    this.dialogResultSubject.next(result);
    this.dialogResultSubject.complete();
  }

  // close() {
  //   this.dialogCloseSubject.next();
  // }
}
