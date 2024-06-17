import {
  Injectable,
  ComponentRef,
  Type,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogCloseSubject = new Subject<void>();
  private activeDialogComponentRef: ComponentRef<DialogComponent> | null = null;
  private activeContentComponentRef: ComponentRef<any> | null = null;
  public isDialogActive = false;

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector
  ) {
    this.dialogCloseSubject.subscribe(() => {
      this.closeDialog();
    });
  }

  openDialog<T>(component: Type<T>, config?: Partial<T>):DialogComponent {
    if (this.isDialogActive) {
      this.closeDialog();
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
      console.log('Dialog component config:', config);
    });
    // console.log('this.activeContentComponentRef?.instance', this.activeDialogComponentRef?.instance);
    return this.activeDialogComponentRef?.instance;
  }

  private createDialogComponent(): ComponentRef<DialogComponent> | null {
    const componentRef = createComponent(DialogComponent, {
      environmentInjector: this.environmentInjector,
    });

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    componentRef.instance.onClose.subscribe(() => this.closeDialog());

    return componentRef;
  }

  closeDialog() {
    console.log('Closing dialog');

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
  }

  close() {
    this.dialogCloseSubject.next();
  }
}
