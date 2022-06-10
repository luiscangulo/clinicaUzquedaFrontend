import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl, FormControl } from '@angular/forms';
import { UsuarioService } from '../../Service/usuario/usuario.service';
import {debounceTime, isEmpty} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatFormFieldControl} from '@angular/material/form-field';
import {MatDialog} from '@angular/material/dialog';
import {DialogFaltaRegistroPacienteComponent} from '../../registro/registro-paciente/registro-paciente.component';

/** Data structure for Usuario. */
export class Usuario {
  constructor(
    public id: string,
    public tipoidentificacion: string,
    public nombre: string,
    public apellido: string,
    public email: string,
    public celular: string,
    public fechanacimiento: Date,
    public direccion: string,
    public departamento: string,
    public ciudad: string
  ) {}
}

/**
 * Componente actualizar paciente en la vista de la secretaria
 */
@Component({
  selector: 'app-actualizar-paciente-para-secretaria',
  templateUrl: './actualizar-paciente-para-secretaria.component.html',
  styleUrls: ['./actualizar-paciente-para-secretaria.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: ActualizarPacienteParaSecretariaComponent }]
})
export class ActualizarPacienteParaSecretariaComponent implements MatFormFieldControl<Usuario>, OnInit {
  data: any = [];
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, public dialog: MatDialog) {
  }

  /**
   * Atrubutos utilizados
   */
  form: FormGroup | any;
  mostrar: any = false;
  mostrarCampo: any = false;
  datapersona: any;
  mensaje = '';
  hide = true;
  public ident = 0;
  public tipoidentificacion = '';
  public nombre = '';
  public apellido = '';
  public email = '';
  public celular = '';
  public fechanacimiento = new Date();
  public direccion = '';
  public departamento = '';
  public ciudad = '';

  /**
   * Atributos requeridos por MatFormControl
   */
  public error = true;
  readonly autofilled: boolean | undefined;
  readonly controlType: string | undefined;
  // @ts-ignore
  readonly disabled: boolean | undefined;
  // @ts-ignore
  readonly empty: boolean | undefined;
  // @ts-ignore
  readonly errorState: boolean | undefined;
  // @ts-ignore
  readonly focused: boolean | undefined;
  // @ts-ignore
  readonly id: string | undefined;
  // @ts-ignore
  readonly ngControl: NgControl | null | undefined;

  // @ts-ignore
  readonly placeholder: string | undefined;
  // @ts-ignore
  readonly required: boolean | undefined;

  // @ts-ignore
  readonly shouldLabelFloat: boolean | undefined;
  // @ts-ignore
  readonly stateChanges: Observable<void> | undefined;
  readonly userAriaDescribedBy: string | undefined;
  // @ts-ignore
  value: Usuario | null | undefined;

  /**
   * Metodo inicializador que hace funcionar los demas metodos que no dependen de un boton
   */
  ngOnInit(): void {
    this.builForm();
  }

  /**
   * Inicializa los formControlname
   */
  initEditForm(): void{
    this.form = this.fb.group({
      id: new FormControl(),
      tipoidentificacion: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      email: new FormControl(),
      celular: new FormControl(),
      fechanacimiento: new FormControl(),
      pais: new FormControl(),
      departamento: new FormControl(),
      ciudad: new FormControl(),
    });
  }
  /**
   * Validar que cada campo sea requerido
   * @private
   */
  private builForm(): void{
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      tipoidentificacion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required]],
      fechanacimiento: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
    });
  }

  /**
   * Metodo para actualizar los datos del paciente
   */
  actualizarUsuario(): void {
    if (this.form.value.id !== '' && this.form.value.tipoidentificacion !== '' && this.form.value.nombre !== ''
      && this.form.value.apellido !== '' && this.form.value.email !== '' && this.form.value.celular !== ''
      && this.form.value.pais !== '' && this.form.value.departamento !== '' && this.form.value.fechanacimiento !== ''
      && this.form.value.ciudad !== ''){
      this.usuarioService.getAllUsuario().subscribe((datauall: any) => {
        for (let i = 0 ; i < datauall.length ; i ++){
          if (this.form.value.id === datauall[i].cedula){
            this.datapersona = {
              cedula: datauall[i].cedula,
              nombre: this.form.value.nombre,
              apellido: this.form.value.apellido,
              seudonimo: datauall[i].seudonimo,
              tipo_identificacion: this.form.value.tipoidentificacion,
              correo: this.form.value.email,
              clave: datauall[i].clave,
              fecha_nacimiento: this.form.value.fechanacimiento,
              celular: this.form.value.celular,
              ciudad: this.form.value.ciudad,
              departamento: this.form.value.departamento,
              pais: this.form.value.pais
            };
          }
        }
        this.usuarioService.updateUsuario(this.datapersona, this.form.value.id).subscribe( (data: any) => {
          window.location.reload();
          this.dialog.open(DialogActualizarPacienteParaSecretariaComponent);
        });
      });
    } else {
      this.dialog.open(DialogFaltaRegistroPacienteComponent);
    }
  }
  /**
   * Cargar los datos del paciente en los campos
   */
  cargarData(): void {
    this.mostrarCampo = true;
    this.usuarioService.getAllUsuario().subscribe((data: any) => {
      let error = true;
      for (let i = 0 ; i < data.length ; i++){
        if (data[i].cedula === this.form.value.id){
          error = false;
        }
      }
      if (error === true){
        this.dialog.open(DialogErrorActualizarPacienteParaSecretariaComponent);
      } else  {
        this.usuarioService.getUsuario(this.form.value.id).subscribe( datas => {
          this.data = datas;
          this.form.patchValue({
            tipoidentificacion: this.data.tipo_identificacion,
            nombre: this.data.nombre,
            apellido: this.data.apellido,
            email: this.data.correo,
            celular: this.data.celular,
            fechanacimiento: this.data.fecha_nacimiento,
            pais: this.data.pais,
            departamento: this.data.departamento,
            ciudad: this.data.ciudad,
          });
        });
      }
    });
  }

  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }
}
/**
 * Se llaman los dialogos para mostrar los mensajes correspondientes
 */
@Component({
  selector: 'app-dialog-actualizar-paciente-para-secretaria',
  templateUrl: 'dialog-actualizar-paciente-para-secretaria.html',
})
export class DialogActualizarPacienteParaSecretariaComponent {}

@Component({
  selector: 'app-dialog-error-actualizar-paciente-para-secretaria',
  templateUrl: 'dialog-error-actualizar-paciente-para-secretaria.html',
})
export class DialogErrorActualizarPacienteParaSecretariaComponent {}
