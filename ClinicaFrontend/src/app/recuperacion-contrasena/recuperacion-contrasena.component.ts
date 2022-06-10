import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl, FormControl } from '@angular/forms';
import {UsuarioService} from '../Service/usuario/usuario.service';
import {RecuperarContrasenaService} from '../Service/recuperar-contrasena/recuperar-contrasena.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

/**
 * Componente para recuperar la contraseña
 */
@Component({
  selector: 'app-recuperacion-contrasena',
  templateUrl: './recuperacion-contrasena.component.html',
  styleUrls: ['./recuperacion-contrasena.component.css']
})
export class RecuperacionContrasenaComponent implements OnInit {
  form: FormGroup | any;
  dataUsuario: any;
  correoConfirmacion: any;
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private envioCorreoService: RecuperarContrasenaService,
              public dialog: MatDialog,
              private router: Router) { }

  /**
   * Metodo inicializador que hace funcionar los demas metodos que no dependen de un boton
   */
  ngOnInit(): void {
    this.builForm();
  }

  /**
   * Inicializa los formControlname
   */
  initEditForm(): void{
    this.form = this.fb.group({
      email: new FormControl(),
      clave: new FormControl(),
    });
  }
  /**
   * Validar que cada campo sea requerido
   * @private
   */
  private builForm(): void{
    this.form = this.fb.group({
      email: ['', [Validators.email]],
    });
  }
  envio(): void{
    this.usuarioService.getAllUsuario().subscribe((datau: any) => {
      for (let i = 0 ; i < datau.length ; i++){
        if (datau[i].correo === this.form.value.email){
          this.dataUsuario = {
            cedula: datau[i].cedula,
            nombre: datau[i].nombre,
            apellido: datau[i].apellido,
            seudonimo: datau[i].seudonimo,
            tipo_identificacion: datau[i].tipo_identificacion,
            correo: datau[i].correo,
            clave: datau[i].cedula,
            fecha_nacimiento: datau[i].fecha_nacimiento,
            celular: datau[i].celular,
            ciudad: datau[i].ciudad,
            departamento: datau[i].departamento,
            pais: datau[i].pais
          };
        }
      }
      this.usuarioService.updateUsuario(this.dataUsuario, this.dataUsuario.cedula).subscribe((dataup: any) => {
        const mensaje = 'Hola ' + this.dataUsuario.nombre
          + ' ' + this.dataUsuario.apellido + '\n\n'
          + 'Clinica Alameda ha cambiado tu contraseña\n\n'
          + 'La nueva contraseña es tu numero de identificacion: ' + this.dataUsuario.cedula
          + '\n\nPor seguridad acceda con el correo electronico y esta nueva contraseña a la pestaña Actualizar datos, por si desea cambiar la contraseña a una mas segura.\n\n'
          + 'Clínica Dental Alameda.\r\n'
          + 'Av Libertador Bernardo O´Higgins 4050\r\n'
          + 'Piso 4, Oficina 418. Estación Central.\r\n'
          + 'Edificio Alameda Oficinas.\r\n'
          + 'Metro San Alberto Hurtado Línea 1\r\n'
          + 'Tel +56 2 32451667 +56989053857';
        this.correoConfirmacion = {
          ownerRef: 'Clinica Dental Alameda',
          emailFrom: 'stgo.cda@gmail.com',
          emailTo: this.dataUsuario.correo,
          subject: 'Recupera tu Contraseña!',
          text: mensaje
        };
        this.envioCorreoService.addCorreoRecuperar(this.correoConfirmacion).subscribe((datae: any) => {
          this.dialog.open(DialogRecuperacionContrasenaComponent);
          this.router.navigateByUrl('/login');
        });
      });
    });
  }

}

@Component({
  selector: 'app-dialog-lista-confirmar-cita-vacia',
  templateUrl: 'dialog-recuperacion-contrasena.html',
})
export class DialogRecuperacionContrasenaComponent {}
