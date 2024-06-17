import { Component, EventEmitter, OnInit, ViewChild, Output, ViewContainerRef, AfterViewInit } from '@angular/core';
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

  viewContainerRef!: ViewContainerRef;

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.dialogContainer) {
      this.viewContainerRef = this.dialogContainer.viewContainerRef;
      console.log('Dialog container view initialized:', this.dialogContainer);
    } else {
      console.error('Dialog container is not available');
    }
  }

  closeDialog() {
    this.onClose.emit();
  }
}
