import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class TipopqrsService {
  private url: string;
  private path: string;
  constructor( private httpClient: HttpClient, private configuracion: AppConfig) {
    console.log('servicio tipo pqrs listo para usar');
    this.url = this.configuracion.configuracion.Url;
    this.path = this.configuracion.configuracion.Patch;
  }
  getAllTipoPqrs(){
    return this.httpClient.get(`${this.url}${this.path}/tipopqrs`);
  }
  getTipoPqrs(id: number){
    return this.httpClient.get(`${this.url}${this.path}/tipopqrs/${id}`);
  }
  addTipoPqrs(tipoPqrs: any){
    return this.httpClient.post(`${this.url}${this.path}/tipopqrs`, tipoPqrs);
  }
  updateTipoPqrs(tipoPqrs: any, idPQRS: number){
    return this.httpClient.put(`${this.url}${this.path}/tipopqrs/${idPQRS}`, tipoPqrs);
  }
  deleteTipoPqrs(id: number) {
    return this.httpClient.delete(`${this.url}${this.path}/tipopqrs/${id}`);
  }
}
