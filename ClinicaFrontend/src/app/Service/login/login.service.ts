import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private url: string;
  // private path: string;
  public name = '';
  constructor(private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio login listo para usar');
    // this.url = this.configuracion.configuracion.Url;
    // this.path = this.configuracion.configuracion.Patch;
  }
  setUser(user: any): any {
    let user_string_name = JSON.stringify(user);
    let user_string = user;
    localStorage.setItem('currentUser', user_string_name);
    this.name = user_string_name;
  }
  setToken(token: any): void {
    localStorage.setItem('accessToken', token);
  }
  getToken() {
    return localStorage.getItem('accessToken');
  }
  getCurrentUser(): any {
    let user_string = localStorage.getItem('currentUser');
    if (!(user_string === null)) {
      // let user = JSON.parse(user_string);
      let user = user_string;
      return user;
    } else if (!(user_string === undefined)){
      // let user = JSON.parse(user_string);
      let user = user_string;
      return user;
    } else {
      return null;
    }
  }
  logoutUser() {
    const accessToken = localStorage.getItem('accessToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
  }
  public get onUsuarioLogueado(): any{
    return this.name;
  }

}
