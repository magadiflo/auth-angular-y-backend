import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private _http = inject(HttpClient);

  //private _currentUser = signal<User | null>(null);
  //private _authStatus = signal<AuthStatus>();

  login(email: string, password: string): Observable<boolean> {
    return of(true);
  }

}
