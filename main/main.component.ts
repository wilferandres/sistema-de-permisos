import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Firestore } from '@angular/fire/firestore'; 
import { FormGroup } from '@angular/forms';
import { doc, deleteDoc } from 'firebase/firestore';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  mostrarUsuarios = false;
  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  direccion: string = '';
  identificacion: string = '';
  correo: string = '';
  sexo: string = '';
  userId: string = '';
  contrasena: string = '';
  rol: string = 'Usuario';
  mostrarFormulario: boolean = false;
 mostrarcitass: boolean = false;
    usuarios: any[] = []; 
    citas: any[]=[];
  constructor(
    private userService: UserService,
    private router: Router,
    private firebaseService: UserService,
    private firestore: Firestore

  ) { 
  
  }

  editarUsuario(usuario: any) {
    this.nombre = usuario.nombre;
    this.apellido = usuario.apellido;
    this.telefono = usuario.telefono;
    this.direccion = usuario.direccion;
    this.identificacion = usuario.identificacion;
    this.correo = usuario.correo;
    this.sexo = usuario.sexo;
    this.contrasena = usuario.contrasena;
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
      sexo: this.sexo,
      contrasena: this.contrasena
    };

    this.userService.editarBarbero(this.identificacion, datos).then(() => {
      alert('Barbero actualizado correctamente');
      this.mostrarUsuarios = true;
      this.mostrarFormulario = false;
    }).catch(error => {
      console.error('Error al actualizar el barbero:', error);
    });
  }

  async eliminarUsuario(userId: string) {
    try {
      await deleteDoc(doc(this.firestore, 'Usuarios', userId));
      console.log("Usuario eliminado con éxito");

      // Si la eliminación es exitosa, también elimina el usuario del array de usuarios

      return true; // Retorna true si la eliminación es exitosa
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      return false; // Retorna false si hay un error al eliminar
    }
  }
  

 
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
 

  mostrarcitas(){
  this.mostrarcitass = !this.mostrarcitass;
  }
  async guardarUsuario() {
    const datoss = {
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono,
      direccion: this.direccion,
      correo: this.correo,
      identificacion: this.identificacion,
      sexo: this.sexo,
      contrasena: this.contrasena,
      rol: this.rol
    };

    try {
    

      await this.userService.creaUsuarios(datoss.nombre, datoss.apellido, datoss.telefono, datoss.direccion, datoss.identificacion, datoss.sexo, datoss.contrasena, datoss.correo, this.rol);
      alert('Usuario creado correctamente');
      await this.userService.register(datoss.correo, datoss.contrasena);
      await this.userService.obtenerUsuarios(); // Volver a obtener la lista de usuarios
      this.resetFormulario();
      console.log(datoss.correo, datoss.contrasena)
      // Envía el correo con las credenciales
      await this.userService. enviarEmail(datoss.correo, datoss.contrasena);
      console.log('Correo enviado exitosamente');
    } catch (error) {
      console.error('Error al crear el usuario o enviar el correo:', error);
    }
  }
resetFormulario() {
  this.nombre = '';
  this.apellido = '';
  this.telefono = '';
  this.direccion = '';
  this.identificacion = '';
  this.correo = '';
  this.sexo = '';
  this.contrasena = '';
  this.correo = ''
  
}
  ngOnInit(): void {
   
    
    this.userService.obtenerUsuarios().then(usuarios => {
      if(usuarios !== null){
        this.usuarios = usuarios;
        console.log(usuarios)
      }

    });

  this.userService.obtenerPermisos().then(citas =>{
    if(citas !== null){
      this.citas = citas;
      console.log(citas)
    }
  })


  }

 
  async onAceptar(identificacion: string) {
    try {
      await this.userService.actualizarEstadoCitaPorIdentificacion(identificacion, 'Aceptada');
      alert('Cita aceptada');
      // Opcionalmente, actualiza la lista de citas en la interfaz
    } catch (error) {
      console.error('Error al aceptar la cita:', error);
      alert('Hubo un error al aceptar la cita');
    }
  }

  async onRechazar(identificacion: string) {
    try {
      await this.userService.actualizarEstadoCitaPorIdentificacion(identificacion, 'Rechazada');
      alert('Cita rechazada');
      // Opcionalmente, actualiza la lista de citas en la interfaz
    } catch (error) {
      console.error('Error al rechazar la cita:', error);
      alert('Hubo un error al rechazar la cita');
    }
  }


  onClick() {

    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }


  

}