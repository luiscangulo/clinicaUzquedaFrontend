import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigJS } from '../../config/configJS';
import { AppConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private url: string;
  private path: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio imagen listo para usar');
    this.url = this.configuracion.configuracion.Url;
    this.path = this.configuracion.configuracion.Patch;
    // this.url = this.configuracion.configuracion;
  }
  getAllClinica(){
    return this.httpClient.get(`${this.url}${this.path}/imagen`);
  }
  getClinica(id: string){
    return this.httpClient.get(`${this.url}${this.path}/imagen/${id}`);
  }
  addClinica(imagen: any){
    return this.httpClient.post(`${this.url}${this.path}/imagen`, imagen);
  }
  updateClinica(imagen: any){
    return this.httpClient.put(`${this.url}${this.path}/imagen/${imagen.id}`, imagen);
  }
  deleteClinica(id: string) {
    return this.httpClient.delete(`${this.url}${this.path}/imagen/${id}`);
  }
}
