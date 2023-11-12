import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-actions-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-actions-view.component.html',
  styleUrls: ['./request-actions-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestActionsViewComponent {


  openDialog(dialogName: string) {
    switch (dialogName) {
      case 'accept':
        
        break;
    
      default:
        break;
    }
  }
}
