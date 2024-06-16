import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DialogService } from '../dialog.service';
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

  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.dialogContainer) {
      console.log('Dialog container view initialized:', this.dialogContainer);
      this.dialogService.setViewContainerRef(this.dialogContainer.viewContainerRef);
    } else {
      console.error('Dialog container is not available');
    }
  }

  onClose() {
    console.log('Dialog close triggered');
    this.dialogService.close();
  }
}
