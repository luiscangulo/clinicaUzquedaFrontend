import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import {LoginService} from '../../Service/login/login.service';
import {LoginComponent} from '../../login/login.component';
import {UsuarioService} from '../../Service/usuario/usuario.service';

@Component({
  selector: 'app-paciente-home',
  templateUrl: './paciente-home.component.html',
  styleUrls: ['./paciente-home.component.css']
})
export class PacienteHomeComponent implements OnInit {
  nombrePersona = '';
  correoPersona: string | null = '';
  constructor(private loginService: LoginService,
              private login: LoginComponent,
              private usuarioService: UsuarioService) {
    this.correoPersona = localStorage.getItem('currentUser');
    this.usuarioService.getAllUsuario().subscribe((datau: any) => {
      for (let i = 0; i < datau.length ; i++) {
        let correoE = '"' + datau[i].correo + '"';
        if (this.correoPersona === correoE){
          this.nombrePersona = datau[i].nombre + ' ' + datau[i].apellido;
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
