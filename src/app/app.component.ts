import { Component, AfterViewInit } from '@angular/core';
import { DialogService } from './dialog.service';
import { CustomContentComponent } from './custom-content/custom-content.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements AfterViewInit {

  constructor(private dialogService: DialogService) {}

  ngAfterViewInit() {
    console.log('App component view initialized');
  }

  openDialog() {
    console.log('Opening dialog with custom content');

    const dialogRef = this.dialogService.openDialog(CustomContentComponent, {
      data: {
        modalDialogBoxProperties: {
          title: 'Confirmation',
          description: 'Delete department',
          message:
            'You are about to permanently delete the ' +
            ' department. Do you want to continue?',
          buttons: [
            {
              name: 'Yes',
              action: (response: boolean): void => {
                return dialogRef.closeDialog();
              },
              value: true,
            },
            {
              name: 'No',
              action: (response: boolean): void => {
                return this.dialogService.closeDialog();
              },
              value: false,
            },
          ],
        },
      },
      visibleButtonClose: true,
      // height: '1050px',
      width: '450px',
    });
    console.log('Dialog ref:', dialogRef);
  }
}
