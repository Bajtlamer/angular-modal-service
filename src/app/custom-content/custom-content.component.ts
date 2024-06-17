import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-content',
  templateUrl: './custom-content.component.html',
  styleUrls: ['./custom-content.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CustomContentComponent {
  @Input() data: any;
  @Input() width!: string;
  @Input() visibleButtonClose: boolean = true;
}
