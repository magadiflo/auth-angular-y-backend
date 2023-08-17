import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  public myForm: FormGroup = this._fb.nonNullable.group({
    email: ['martin@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  login(): void {
    const { email, password } = this.myForm.value;
    this._authService.login(email, password)
      .subscribe({
        next: isAuthenticated => {
          console.log({ isAuthenticated });
          this._router.navigate(['/dashboard']);
        },
        error: err => {
          console.log({ errorComponente: err });
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
          })
        }
      });
  }

}
