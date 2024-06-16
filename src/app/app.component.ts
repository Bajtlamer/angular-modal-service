import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { DialogService } from './dialog.service';
import { CustomContentComponent } from './custom-content/custom-content.component';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, DialogComponent]
})
export class AppComponent implements AfterViewInit {
  @ViewChild(DialogComponent) dialogComponent!: DialogComponent;

  constructor(private dialogService: DialogService) {}

  ngAfterViewInit() {
    console.log('App component view initialized');
  }

  openDialog() {
    console.log('Opening dialog with custom content');
    this.dialogService.openDialog(CustomContentComponent, { someConfig: 'value' });
  }
}
