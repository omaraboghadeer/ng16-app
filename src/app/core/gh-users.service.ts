import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitHubUser, GitHubUserDetails } from './models/user.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GhUsersService {
  private readonly url: string = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  searchUsers(url: string, query: string): Observable<GitHubUser[]> {
    return this.http.get<GitHubUser[]>(`${this.url}/${url}?q=${query}`).pipe(
      map((res: any) => res.items)
    );
  }

  searchUser(username: string): Observable<GitHubUserDetails> {
    return this.http.get<GitHubUserDetails>(`${this.url}/users/${username}`)
  }

}
