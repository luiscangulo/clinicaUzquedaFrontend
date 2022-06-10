import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string;
  private path: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio usuario listo para usar');
    this.url = this.configuracion.configuracion.Url;
    this.path = this.configuracion.configuracion.Patch;
  }
  getAllUsuario(){
    return this.httpClient.get(`${this.url}${this.path}/Usuario`);
  }
  getUsuario(id: string){
    return this.httpClient.get(`${this.url}${this.path}/persona/${id}`);
  }
  addUsuario(usuario: any){
    // console.log(usuario);
    return this.httpClient.post(`${this.url}${this.path}/persona`, usuario);
  }
  updateUsuario(usuario: any, cedula: string){
    return this.httpClient.put(`${this.url}${this.path}/persona/${cedula}`, usuario);
  }
  deleteUsuario(id: string) {
    return this.httpClient.delete(`${this.url}${this.path}/persona/${id}`);
  }
  /*
  private usuario: Usuario[] = [];
  private url: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio usuario listo para usar');
    this.url = this.configuracion.configuracion;
  }
  getAllUsuario(){
    return this.httpClient.get(`${this.url}/usuario/`);
  }
  getUsuario(id: string){
    return this.httpClient.get(`${this.url}/usuario/${id}`);
  }
  addUsuario(usuario: any){
    // console.log(usuario);
    return this.httpClient.post(`${this.url}/usuario/`, usuario);
  }
  updateUsuario(usuario: any){
    return this.httpClient.put(`${this.url}/usuario/${usuario.id}`, usuario);
  }
  deleteUsuario(id: number) {
    return this.httpClient.delete(`${this.url}/usuario/${id}`);
  }
   */
}
export interface Usuario{
  rut: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  celular: string;
  fecha_nacimiento: string;
  direccion: string;
}
