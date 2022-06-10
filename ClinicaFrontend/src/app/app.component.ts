import {Component, OnInit} from '@angular/core';
import {DialogErrorLoginComponent, LoginComponent} from './login/login.component';
import {Router} from '@angular/router';
import {LoginService} from './Service/login/login.service';
import {UsuarioService} from './Service/usuario/usuario.service';
import {RoleService} from './Service/role/role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'clinica-dental-alameda';
  isLogged = false;
  correoPersona: string | null = '';
  constructor(private login: LoginComponent,
              private router: Router,
              private loginService: LoginService,
              private roleService: RoleService,
              private usuarioService: UsuarioService) {
    // this.onCheckUser();
  }
  ngOnInit(){
    this.onCheckUser();
    /*
    if (this.login.onSesionIniciada === true){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
     */
  }
  onCheckUser(): void {
    if (this.loginService.getCurrentUser() === null) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
    }
  }
  dirigirRuta(): void{
    this.correoPersona = localStorage.getItem('currentUser');
    this.roleService.getAllRol().subscribe((datar: any) => {
      this.usuarioService.getAllUsuario().subscribe((datau: any) => {
        for (let i = 0 ; i < datar.length ; i++ ){
          for (let j = 0 ; j < datau.length ; j++ ){
            let correoE = '"' + datau[j].correo + '"';
            if (this.correoPersona === correoE){
              if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'paciente'){
                this.router.navigate(['/paciente/paciente-home']);
              }
              if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'administrador'){
                this.router.navigate(['/administrador']);
              }
              if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'odontologo'){
                this.router.navigate(['/odontologo']);
              }
              if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'secretaria'){
                this.router.navigate(['/secretaria']);
              }
            }
          }
        }
      });
    });
  }
  onLogout(): void {
    this.loginService.logoutUser();
    // this.isLogged = false;
    // this.login.sesionIniciada = false;
    // this.isLogged = this.login.sesionIniciada;
    // this.router.navigate(['/home']);
    // window.location.reload();
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl('/home').then(() => {
      window.location.reload();
      // this.router.onSameUrlNavigation = 'ignore';

    });
  }
  /*
  reserva(): void{
    if (this.login.onSesionIniciada.sesionIniciada === true){
      this.router.navigate(['/registro/registro-cita']);
    } else {
      this.router.navigate(['/login']);
    }
  }
   */
}
