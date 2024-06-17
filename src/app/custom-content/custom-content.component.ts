import { Component, Input } from '@angular/core';
import { DialogService } from '../dialog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-content',
  templateUrl: './custom-content.component.html',
  styleUrls: ['./custom-content.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CustomContentComponent {
  constructor(private dialogService: DialogService) {}
  @Input() data: any;
  @Input() width!: string;
  @Input() visibleButtonClose: boolean = true;

  submitValue() {
    this.dialogService.closeDialog('Submitted Value Hello World!');
  }
}
