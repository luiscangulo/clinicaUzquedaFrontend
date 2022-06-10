import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url: string;
  private path: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio rol listo para usar');
    this.url = this.configuracion.configuracion.Url;
    this.path = this.configuracion.configuracion.Patch;
  }
  getAllRol(){
    return this.httpClient.get(`${this.url}${this.path}/roles`);
  }
  getRol(id: number){
    return this.httpClient.get(`${this.url}${this.path}/roles/${id}`);
  }
  addRol(rol: any){
    return this.httpClient.post(`${this.url}${this.path}/roles`, rol);
  }
  updateRol(rol: any, id: number){
    return this.httpClient.put(`${this.url}${this.path}/roles/${id}`, rol);
  }
  deleteRol(id: number) {
    return this.httpClient.delete(`${this.url}${this.path}/roles/${id}`);
  }
}
