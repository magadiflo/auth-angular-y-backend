import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

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
  public authStatus = computed(() => this._authStatus());

  constructor() {
    // Apenas se inicie este servicio nos subscribimos al checkAuthStatus()
    // para ver el cambio del estado de la variable _authStatus  y por supuesto
    // el cambio de la variable pública authStatus
    this.checkAuthStatus()
      .subscribe();
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this._baseUrl}/auth/login`;
    const body = { email, password };
    return this._http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this._setAuthentication(user, token)),
        catchError(err => throwError(() => err.error.message)),
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._authStatus.set(AuthStatus.notAuthenticated);
    this._currentUser.set(null);
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this._baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    };

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this._http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this._setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      );
  }

  private _setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }

}
