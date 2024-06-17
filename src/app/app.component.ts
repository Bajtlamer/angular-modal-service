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
    this.dialogService.openDialog(CustomContentComponent, { data: 'value', width: '500px', visibleButtonClose: true})
      .subscribe(result => {
        console.log('CLOSE APP result:', result);
      });
  }
}
