import { ChangeDetectionStrategy, Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GhUsersService } from 'src/app/core/gh-users.service';
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  template: `
    <app-user-card [userDetails]="userDetails()" />
  `,
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent {
  private ghUsersService = inject(GhUsersService);

  userDetails = signal({});

  @Input() set username(name: string) {
    this.ghUsersService.searchUser(name).subscribe(
      (res) => this.userDetails.set(res),
      (err) => console.log(err),
    )
  }

}
