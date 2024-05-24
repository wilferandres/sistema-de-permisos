import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Firestore } from '@angular/fire/firestore'; 

import { FormGroup } from '@angular/forms';
import { doc, deleteDoc } from 'firebase/firestore';
@Component({
  selector: 'app-edicion-user',
  templateUrl: './edicion-user.component.html',
  styleUrls: ['./edicion-user.component.css']
})
export class EdicionUserComponent implements OnInit {
  mostrarUsuarios = true;
  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  direccion: string = '';
  identificacion: string = '';
  correo: string = '';
  sexo: string = '';
  userId: string = '';
  rol: string = '';
  mostrarFormulario: boolean = false;
 contrasena: string = '';
    usuarios: any[] = []; 
  constructor( private userService: UserService,
    private router: Router,
    private firebaseService: UserService,
    private firestore: Firestore) { }

    editarUsuario(usuario: any) {
      this.nombre = usuario.nombre;
      this.apellido = usuario.apellido;
      this.telefono = usuario.telefono;
      this.direccion = usuario.direccion;
      this.correo = usuario.correo;
      this.identificacion = usuario.identificacion;
      this.sexo = usuario.sexo;
      this.contrasena = usuario.contrasena;
      this.rol = usuario.rol;
      this.mostrarUsuarios = false;
      this.mostrarFormulario = true;
    }
    EditUser() {
      const datos = {
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono,
        direccion: this.direccion,
        correo: this.correo,
        identificacion: this.identificacion,
        sexo: this.sexo,
        rol: this.rol
      };
  
      this.userService.editarBarbero(this.identificacion, datos).then(() => {
        alert('Barbero actualizado correctamente');
        this.mostrarUsuarios = true;
        this.mostrarFormulario = false;
        this.userService.obtenerUsuarios().then(usuarios => {
          if(usuarios !== null){
            this.usuarios = usuarios;
            console.log(usuarios)
          }
      
        });
      }).catch(error => {
        console.error('Error al actualizar el barbero:', error);
      });
    }
  
    async eliminarUsuario(identificacion: string) {
      try {
        await this.userService.eliminarUsuarioPorIdentificacion(identificacion);
        this.usuarios = this.usuarios.filter(usuario => usuario.identificacion !== identificacion);
        alert("Usuario eliminado")
        console.log('Usuario eliminado con éxito');
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    }
 ngOnInit(): void {
   
    
  this.userService.obtenerUsuarios().then(usuarios => {
    if(usuarios !== null){
      this.usuarios = usuarios;
      console.log(usuarios)
    }

  });


}

}
