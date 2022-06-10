import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {UsuarioService} from '../Service/usuario/usuario.service';
import {RoleService} from '../Service/role/role.service';
import {LoginService} from '../Service/login/login.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogFaltaRegistroPacienteComponent} from '../registro/registro-paciente/registro-paciente.component';

/**
 * Componente del login
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'
    , 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '+'];
  public mostrarCaptcha = '';
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private roleService: RoleService,
              private loginService: LoginService,
              private router: Router,
              public dialog: MatDialog) {
    const a = this.alpha[Math.floor(Math.random() * 71)];
    const b = this.alpha[Math.floor(Math.random() * 71)];
    const c = this.alpha[Math.floor(Math.random() * 71)];
    const d = this.alpha[Math.floor(Math.random() * 71)];
    const e = this.alpha[Math.floor(Math.random() * 71)];
    const f = this.alpha[Math.floor(Math.random() * 71)];

    const final = a + b + c + d + e + f;
    this.mostrarCaptcha = final;
  }
  public get onSesionIniciada(): any{
    return this.sesionIniciada;
  }
  sesionIniciada = false;
  mensajeEnviar = '';
  loginForm: FormGroup | any;
  ruta = '';
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  /**
   * Inicializa los campos de texto
   */
  initEditForm(): void{
    this.loginForm = this.fb.group({
      email: new FormControl(),
      password: new FormControl(),
      captcha: new FormControl(),
      textinput: new FormControl(),
    });
  }

  /**
   * Valida que los campos sean requeridos
   * @private
   */
  private builForm(): void{
    this.loginForm = this.fb.group({
      email: ['', [Validators.email]],
      password: [''],
      captcha: [''],
      textinput: [''],
    });
  }

  /**
   * Metodo inicializador que hace funcionar los demas metodos que no dependen de un boton
   */
  ngOnInit(){
    this.builForm();
  }

  /**
   * Metodo que valida si se puede loguear o no
   */
  onLogin(): void{
    if (this.loginForm.value.email !== '' && this.loginForm.value.password !== '' && this.loginForm.value.textinput !== ''){
      if (this.validcap()){
        this.sesionIniciada = false;
        this.roleService.getAllRol().subscribe((datar: any) => {
          this.usuarioService.getAllUsuario().subscribe((datau: any) => {
            for (let i = 0 ; i < datar.length ; i++ ){
              for (let j = 0 ; j < datau.length ; j++ ){
                if (datau[j].correo === this.loginForm.value.email && datau[j].clave === this.loginForm.value.password){
                  this.sesionIniciada = true;
                  if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'paciente'){
                    const correo = this.loginForm.value.email;
                    const data = {
                      email: this.loginForm.value.email,
                      password: this.loginForm.value.password
                    };
                    this.loginService.setUser(correo);
                    const token = data;
                    this.loginService.setToken(token);
                    this.router.onSameUrlNavigation = 'reload';
                    this.router.navigateByUrl('/paciente/paciente-home').then(() => {
                      window.location.reload();
                    });
                  }
                  if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'administrador'){
                    const correo = this.loginForm.value.email;
                    const data = {
                      email: this.loginForm.value.email,
                      password: this.loginForm.value.password
                    };
                    this.loginService.setUser(correo);
                    const token = data;
                    this.loginService.setToken(token);
                    this.router.onSameUrlNavigation = 'reload';
                    this.router.navigateByUrl('/administrador').then(() => {
                      window.location.reload();
                    });
                  }
                  if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'odontologo'){
                    const correo = this.loginForm.value.email;
                    const data = {
                      email: this.loginForm.value.email,
                      password: this.loginForm.value.password
                    };
                    this.loginService.setUser(correo);
                    const token = data;
                    this.loginService.setToken(token);
                    this.router.onSameUrlNavigation = 'reload';
                    this.router.navigateByUrl('/odontologo').then(() => {
                      window.location.reload();
                    });
                  }
                  if (datar[i].cedula === datau[j].cedula && datar[i].nombre === 'secretaria'){
                    const correo = this.loginForm.value.email;
                    const data = {
                      email: this.loginForm.value.email,
                      password: this.loginForm.value.password
                    };
                    this.loginService.setUser(correo);
                    const token = data;
                    this.loginService.setToken(token);
                    this.router.onSameUrlNavigation = 'reload';
                    this.router.navigateByUrl('/secretaria').then(() => {
                      window.location.reload();

                    });
                  }
                }
              }
            }
            if (!this.sesionIniciada){
              this.dialog.open(DialogErrorLoginComponent);
            }
          });
        });
      } else {
        this.dialog.open(DialogErrorCaptchaComponent);
      }
    } else {
      this.dialog.open(DialogFaltaRegistroPacienteComponent);
    }
  }

  cap(): void{
    const a = this.alpha[Math.floor(Math.random() * 71)];
    const b = this.alpha[Math.floor(Math.random() * 71)];
    const c = this.alpha[Math.floor(Math.random() * 71)];
    const d = this.alpha[Math.floor(Math.random() * 71)];
    const e = this.alpha[Math.floor(Math.random() * 71)];
    const f = this.alpha[Math.floor(Math.random() * 71)];

    const final = a + b + c + d + e + f;
    this.mostrarCaptcha = final;
  }

  validcap(): boolean{
    const stg1 = this.mostrarCaptcha;
    const stg2 = this.loginForm.value.textinput;
    if (stg1 === stg2){
      return true;
    }else{
      return false;
    }
  }
}

@Component({
  selector: 'app-dialog-error-login',
  templateUrl: 'dialog-error-login.html',
})
export class DialogErrorLoginComponent {}

@Component({
  selector: 'app-dialog-error-captcha',
  templateUrl: 'dialog-error-captcha.html',
})
export class DialogErrorCaptchaComponent {}
