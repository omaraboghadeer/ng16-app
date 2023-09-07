import { ChangeDetectionStrategy, Component, Signal, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, NgFor } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { GhUsersService } from 'src/app/core/gh-users.service';
import { GitHubUser } from 'src/app/core/models/user.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule],
  template: `
    <input #input type="text" (input)="searchTerm.set(input.value)"
      class="border-white border-2 border-solid p-2 w-full bg-transparent rounded-lg outline-0">
    <ul>
      <li *ngFor="let user of ghUsers()" class="border-white border-solid border-2 rounded-lg my-5 py-2 flex items-center cursor-pointer" [routerLink]="['/user-details', user.login]" >
        <img [src]="user.avatar_url" class="rounded-full w-12 h-12 mr-5 object-cover">
        {{user.login}}
      </li>
    </ul>
  `,
  styleUrls: ['./user-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSearchComponent {

  private ghUserService = inject(GhUsersService);

  searchTerm = signal('');
  ghUsers: Signal<GitHubUser[]> = toSignal(
      toObservable(this.searchTerm).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter(term => term.length > 0),
      switchMap(term => this.ghUserService.searchUsers('search/users', term))
    ), 
    {initialValue: []}
  );
  

}
