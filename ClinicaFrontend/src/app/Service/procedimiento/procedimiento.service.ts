import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProcedimientoService {
  private url: string;
  private path: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio procedimiento listo para usar');
    this.url = this.configuracion.configuracion.Url;
    this.path = this.configuracion.configuracion.Patch;
  }
  getAllProcedimiento(){
    return this.httpClient.get(`${this.url}${this.path}/tipoprocedimiento`);
  }
  getProcedimiento(id: number){
    return this.httpClient.get(`${this.url}${this.path}/tipoprocedimiento/${id}`);
  }
  addProcedimiento(procedimiento: any){
    return this.httpClient.post(`${this.url}${this.path}/tipoprocedimiento`, procedimiento);
  }
  updateProcedimiento(procedimiento: any, idProcedimiento: number){
    return this.httpClient.put(`${this.url}${this.path}/tipoprocedimiento/${idProcedimiento}`, procedimiento);
  }
  deleteProcedimiento(id: number) {
    return this.httpClient.delete(`${this.url}${this.path}/tipoprocedimiento/${id}`);
  }
}
