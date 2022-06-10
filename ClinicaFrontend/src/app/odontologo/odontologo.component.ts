import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../Service/usuario/usuario.service';

@Component({
  selector: 'app-odontologo',
  templateUrl: './odontologo.component.html',
  styleUrls: ['./odontologo.component.css']
})
export class OdontologoComponent implements OnInit {
  nombrePersona = '';
  correoPersona: string | null = '';
  constructor(private usuarioService: UsuarioService) {
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
