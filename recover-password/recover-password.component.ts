import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  formRecuperar: FormGroup;

  constructor(    private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.formRecuperar = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
   }

  ngOnInit(): void {
  
  }
  onSubmit() {
    const email = this.formRecuperar.value.email;
    this.userService.resetPassword(email)
    this.router.navigate(['/login'])
      .then(() => {
        alert('Correo de recuperación enviado. Por favor, revisa tu bandeja de entrada.');
      })
      .catch(error => {
        console.error('Error al enviar correo de recuperación:', error);
        alert('Hubo un error al enviar el correo de recuperación. Por favor, intenta nuevamente.');
      });
  }
  }


