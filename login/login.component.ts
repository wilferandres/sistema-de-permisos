import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  usuarios: any[] = [];
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
    this.userService.obtenerUsuarios().then(usuarios => {
      if(usuarios !== null){
        this.usuarios = usuarios;
        console.log("usuarios traidos",this.usuarios)
      }

    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      const formData = this.formLogin.value;
      
      // Validación del correo electrónico utilizando una expresión regular
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(formData.email)) {
        alert('Por favor, introduce un correo electrónico válido.');
        return;
      }
    
      // Validación del usuario y contraseña (ejemplo: longitud mínima)
      if (formData.password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
      }
    
      // Enviar solicitud de inicio de sesión si todas las validaciones pasan
      this.userService.login(formData)
        .then(userCredential => {
          const correo = userCredential.user.email;
    
          // Obtener el usuario actual del array de usuarios
          const usuarioEncontrado = this.usuarios.find(user => user.correo === correo);
       
          if (usuarioEncontrado) {
            // Se encontró un usuario
            if (usuarioEncontrado.rol === "Usuario") {
                // Usuario con rol de usuario encontrado
                console.log('Usuario con rol de usuario encontrado:', usuarioEncontrado);
                // Redirigir a la pantalla usuario
                this.router.navigate(['/usuario']);
            } else {
                // Usuario encontrado pero con un rol diferente a "usuario"
                console.log('Usuario encontrado pero con un rol diferente a "usuario":', usuarioEncontrado);
                // Redirigir a la pantalla main
                this.router.navigate(['/main']);
            }
          } else {
              // Usuario no encontrado
              console.log('Usuario no encontrado');
              this.router.navigate(['/main']);
          }
        })
        .catch(error => {
          console.log("Error al iniciar sesión:", error);
          alert('Usuario o contraseña incorrectos');
        });
    } else {
      alert('Por favor, complete todos los campos.');
    }
    
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this.router.navigate(['/main']);
      })
      .catch(error => console.log(error))
  }

}
