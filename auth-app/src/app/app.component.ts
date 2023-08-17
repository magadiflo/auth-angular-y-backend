import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private _router = inject(Router);
  private _authService = inject(AuthService);
  //Cuando no es tan obvio el valor del retorno de la señal, podemos agregar el tipo de dato entre <>
  public finishedAuthCheck = computed<boolean>(() => {
    if (this._authService.authStatus() === AuthStatus.checking) {
      return false;
    }
    return true;
  });

  // Con el efecto estamos pendientes del cambio de: this.authService.authStatus()
  public authStatusChangedEffect = effect(() => {
    switch (this._authService.authStatus()) {
      case AuthStatus.checking:
        break;
      case AuthStatus.authenticated:
        this._router.navigate(['/dashboard']);
        break;
      case AuthStatus.notAuthenticated:
        this._router.navigate(['/auth', 'login']);
        break;
    }
  });

}
