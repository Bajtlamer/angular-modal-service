import { Component, EventEmitter, OnInit, ViewChild, Output, ViewContainerRef, AfterViewInit, Input } from '@angular/core';
import { DialogContainerDirective } from '../dialog-container.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: true,
  imports: [CommonModule, DialogContainerDirective]
})
export class DialogComponent implements OnInit, AfterViewInit {
  @ViewChild(DialogContainerDirective, { static: true }) dialogContainer!: DialogContainerDirective;
  @Output() onClose = new EventEmitter<void>();
  @Input() config: any;
  @Input() visibleButtonClose: boolean = true;
  @Input() width: string = '450px';

  viewContainerRef!: ViewContainerRef;

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.dialogContainer) {
      this.viewContainerRef = this.dialogContainer.viewContainerRef;
      // console.log('Dialog container view initialized:', this.viewContainerRef);
      // console.log('Dialog config:', this.config);
    } else {
      console.error('Dialog container is not available');
    }
  }

  closeDialog(result: any = null) {
    this.onClose.emit(result);
  }
}
