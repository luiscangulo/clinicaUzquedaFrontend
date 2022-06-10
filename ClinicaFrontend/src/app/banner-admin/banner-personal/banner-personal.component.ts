import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import {filter} from 'rxjs/operators';
import {ImagenService} from '../../Service/imagen/imagen.service';

/**
 * Componente del banner controlado por el administrador
 */
@Component({
  selector: 'app-banner-personal',
  templateUrl: './banner-personal.component.html',
  styleUrls: ['./banner-personal.component.css']
})
export class BannerPersonalComponent implements OnInit {
  data: any = [];
  images: any[] = [];
  public previsualizacion = '';
  public loading = false;
  public archivos: any = [];

  // ANOTHER
  public selectedFiles: FileList[];
  // Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  public progressInfo = [];
  public message = '';
  public imageName = '';

  /**
   * Se obtienen todas las imagenes de la base de datos
   * @param fb - formulario
   * @param config - configuracion del carrusel
   * @param sanitizer - se utiliza en base64
   * @param router - redirige a otras paginas
   * @param clinica - servicio de la entidad imagen
   */
  constructor(private fb: FormBuilder,
              private config: NgbCarouselConfig,
              private sanitizer: DomSanitizer,
              private router: Router,
              private imagenService: ImagenService) {
    this.imagenService.getAllClinica().subscribe((Response: any) => {
      let archivo = '';
      for (let i = 0; i < Response.length; i++) {
        archivo = Response[i].url;
        this.images.push(archivo);
      }
    });
    this.selectedFiles = [];
    config.interval = 5000;
  }

  form: FormGroup | any;

  /**
   * Metodo inicializador que hace funcionar los demas metodos que no dependen de un boton
   */
  ngOnInit(): void {
    this.builForm();
  }

  /**
   * Inicializa los formControlname
   */
  initEditForm(): void {
    this.form = this.fb.group({
      img: new FormControl(),
    });
  }

  /**
   * Configuracion de los formularios
   * @private
   */
  private builForm(): void {
    this.form = this.fb.group({
      img: [''],
    });
  }

  /**
   * Obtiene las imagenes que son seleccionadas de la carpeta de archivos del ordenador, tambien llama los demas metodos
   * @param event
   */
  capturarFile(event: any): void {
    this.imagenService.getAllClinica().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        let id = data[i].idImagen;
        this.imagenService.deleteClinica(id).subscribe();
      }
      for (const element of event.target.files){
        const archivoCapturado = element;
        this.extraerBase64(archivoCapturado).then((imagen: any) => {
          this.previsualizacion = imagen.base;
          this.images.push(imagen.base);
          this.cargar(imagen.base);
        });
      }
    });
  }

  /**
   * Convierte la url de la imagen en otra url compatible con el navegador, le cambia el formato
   * @param $event
   */
  extraerBase64 = async ($event: any) => new Promise((resolve, reject): any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  /**
   * Sube la url de la imagen en base64 a la base de datos
   * @param imagen
   */
  cargar(imagen: any): void {
    const contador = this.images.length;
    if (contador === 0){
      let datosi = {
        id: 1,
        url: imagen
      };
      this.imagenService.addClinica(datosi).subscribe();
    } else {
      let datosi = {
        id: contador,
        url: imagen
      };
      this.imagenService.addClinica(datosi).subscribe((dataadd: any) => {
        window.location.reload();
      });
    }
  }

}
