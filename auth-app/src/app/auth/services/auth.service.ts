import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _baseUrl: string = environment.baseUrl;
  private _http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //* Al exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus);

  login(email: string, password: string): Observable<boolean> {
    const url = `${this._baseUrl}/auth/login`;
    const body = { email, password };
    return this._http.post<LoginResponse>(url, body)
      .pipe(
        tap(({ user, token }) => {
          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);
          console.log({ user, token });
        }),
        map(resp => true),
        // TODO: errores
      );
  }

}
