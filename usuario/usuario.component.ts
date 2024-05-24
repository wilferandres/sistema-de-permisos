import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Firestore } from '@angular/fire/firestore'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  mostrarFormulario: boolean = false;
  mostrarUsuarios = false;
  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  identificacion: string = '';
  motivo: string = '';
  fecha: string = '';
  usuarios: any[] = []; 
  constructor(
    private userService: UserService,
    private router: Router,
    private firebaseService: UserService,
    private firestore: Firestore

  ) { }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
 
toggleCitas(){
  this.mostrarUsuarios = !this.mostrarUsuarios;
}

  ngOnInit(): void {
   
    
    this.userService.obtenerPermisos().then(usuarios => {
      if(usuarios !== null){
        this.usuarios = usuarios;
        console.log(usuarios)
      }
  
    });
  
  
  }
  onClick() {

    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

  guardarPermiso(){
    const datoss = {
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono,
      identificacion: this.identificacion,
      motivo: this.motivo,
      fecha: this.fecha,
  
    };

    try {
    
      this.userService.crearPermiso(datoss.nombre, datoss.apellido, datoss.telefono, datoss.identificacion, datoss.motivo, datoss.fecha);
      this.mostrarFormulario = false;
      alert('Permiso creado correctament');
      this.resetFormulario();
    } catch (error) {
      console.error('Error al crear el usuario o enviar el correo:', error);
    }

  }

  actualizarEstadoLocal(identificacion: string, nuevoEstado: string) {
    const cita = this.usuarios.find(c => c.identificacion === identificacion);
    if (cita) {
      cita.estado = nuevoEstado;
    }
  }

  async eliminarUsuario(identificacion: string) {
    try {
      await this.userService.eliminarcitas(identificacion);
      this.usuarios = this.usuarios.filter(usuario => usuario.identificacion !== identificacion);
      alert("Usuario eliminado")
      console.log('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  }

  
  resetFormulario() {
    this.nombre = '';
    this.apellido = '';
    this.telefono = '';
    this.identificacion = '';
    this.motivo = '';
    this.fecha = '';

    
  }
}
