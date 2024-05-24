import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      await this.userService.register(this.formReg.value.email, this.formReg.value.password);
      window.alert('Usuario creado con éxito y correo enviado.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
      window.alert('Hubo un error al crear el usuario o enviar el correo. Por favor, inténtalo de nuevo.');
    }
  }

}
