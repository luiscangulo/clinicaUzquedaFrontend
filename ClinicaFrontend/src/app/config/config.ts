import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';


@Injectable()
export class AppConfig{

  private configuracionj = '';
  private _configuracion: any;
  private path: any;

  constructor() {
    this.initConfiguracion();
  }

  /**
   * Trae la url del backend
   * @private
   */
  private initConfiguracion(): void{
    // this.configuracionj = 'http://localhost:3000';
    this._configuracion = {
      Url: environment.productionUrl,
      Patch: environment.productionPatch
    };
  }

  public get configuracion(): any{
    return this._configuracion;
  }


}
