import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private url: string;
  private path: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio cita listo para usar');
    this.url = this.configuracion.configuracion.Url;
    this.path = this.configuracion.configuracion.Patch;
  }
  getAllCita(){
    return this.httpClient.get(`${this.url}${this.path}/cita`);
  }
  getCita(id: number){
    return this.httpClient.get(`${this.url}${this.path}/cita/${id}`);
  }
  addCita(cita: any){
    // console.log(cita);
    return this.httpClient.post(`${this.url}${this.path}/cita`, cita);
  }
  updateCita(cita: any, idCita: number){
    return this.httpClient.put(`${this.url}${this.path}/cita/${idCita}`, cita);
  }
  deleteCita(id: number) {
    return this.httpClient.delete(`${this.url}${this.path}/cita/${id}`);
  }
}
