import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {ImagenService} from '../../Service/imagen/imagen.service';

/**
 * Componente del banner
 */
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  images: any[] = [];

  /**
   * Se obtienen las imagenes desde el servicio de la base de datos para cargaralas en el home
   * @param config - configuracion del carrusel
   * @param clinica - servicio de la entidad imagen
   */
  constructor(private config: NgbCarouselConfig, private imagenService: ImagenService) {
    this.imagenService.getAllClinica().subscribe((Response: any) => {
      let archivo = '';
      for (let i = 0; i < Response.length; i++) {
        archivo = Response[i].url;
        this.images.push(archivo);
      }
    });
    config.interval = 5000;
  }

  ngOnInit(): void {
  }

}
