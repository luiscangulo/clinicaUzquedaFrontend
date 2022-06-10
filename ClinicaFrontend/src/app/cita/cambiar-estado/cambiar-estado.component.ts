import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, NgControl,
  Validators
} from '@angular/forms';
import { MatFormFieldControl} from '@angular/material/form-field';
import { UsuarioService } from '../../Service/usuario/usuario.service';
import { CitaService } from '../../Service/cita/cita.service';
import { RoleService } from '../../Service/role/role.service';
import {ProcedimientoService} from '../../Service/procedimiento/procedimiento.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DialogFaltaRegistroPacienteComponent} from '../../registro/registro-paciente/registro-paciente.component';

/** Data structure for cita. */
export class Cita {
  constructor(
    public id: string,
    public tipoespecialidad: string,
    public fechacita: Date,
    public hora: string,
    public estado: string,
    public odontologo: string
  ) {}
}

/**
 * Componente de cambiar el estado a la cita
 */
@Component({
  selector: 'app-cambiar-estado',
  templateUrl: './cambiar-estado.component.html',
  styleUrls: ['./cambiar-estado.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: CambiarEstadoComponent }]
})
export class CambiarEstadoComponent implements MatFormFieldControl<Cita>, OnInit{
  data: any = [];
  public listaOdontologo: Array<any> = [];

  /**
   * LLena el array de odontologos solo con su nombre y apellido
   * @param fb - formularios
   * @param usuarioService - servicio de la entidad usuario
   * @param citaService - servicio de la entidad cita
   * @param rolService - servicio de la entidad rol
   * @param procedimientoService - servicio de la entidad procedimiento
   * @param dialog - mostrar ventana con mensajes
   */
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private citaService: CitaService,
              private rolService: RoleService,
              private procedimientoService: ProcedimientoService,
              public dialog: MatDialog) {
    this.rolService.getAllRol().subscribe((datar: any) => {
      this.usuarioService.getAllUsuario().subscribe((datasO: any) => {
        for (let i = 0 ; i < datar.length ; i++){
          for (let j = 0; j < datasO.length ; j++) {
            if (datar[i].cedula === datasO[j].cedula && datar[i].nombre === 'odontologo'){
              this.listaOdontologo.push(datasO[j].nombre + ' ' + datasO[j].apellido);
            }
          }
        }
      });
    });
  }

  /**
   * Atributos utilizados
   */
  form: FormGroup | any;
  mostrar: any = false;
  public odontologos: any[] = [];
  public paciente: any[] = [];
  dataAgenda: any;
  public ident = 0;
  public tipoespecialidad = '';
  public fechacita = new Date();
  public hora = '';
  public estado = '';
  public odontologo = '';

  /**
   * Atributos que los requiere MatFormControl cuando es utilizado
   */
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
  value: Cita | null | undefined;

  /**
   * Metodo inicializador que hace funcionar los demas metodos que no dependen de un boton
   */
  ngOnInit(): void{
    this.builForm();
  }

  /**
   * Inicializa los formControlname
   */
  initEditForm(): void{
    this.form = this.fb.group({
      id: new FormControl(),
      tipoespecialidad: new FormControl(),
      fechacita: new FormControl(),
      hora: new FormControl(),
      estado: new FormControl(),
      odontologo: new FormControl(),
    });
  }

  /**
   * Validar que cada campo sea requerido
   * @private
   */
  private builForm(): void{
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      tipoespecialidad: ['', [Validators.required]],
      fechacita: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      odontologo: ['', [Validators.required]],
    });
  }

  /**
   * Llena algunos de los campos de informacion del paciente
   */
  cargarData(): void{
    this.usuarioService.getAllUsuario().subscribe((datoId: any) => {
      let idencontrado = false;
      for (let i = 0 ; i < datoId.length ; i ++){
        if (this.form.value.id === datoId[i].cedula){
          idencontrado = true;
          break;
        }
      }
      if (idencontrado === false){
        this.dialog.open(DialogErrorCambiarEstadoComponent);
      } else {
        let id = '';
        this.citaService.getAllCita().subscribe( (dataAll: any) => {
          for (let i = 0; i < dataAll.length; i++) {
            if (this.form.value.id === dataAll[i].paciente.cedula){
              id = String(dataAll[i].idCita);
            }
          }
          this.citaService.getCita(Number(id)).subscribe( data => {
            this.data = data;
            this.form.patchValue({
              fechacita: this.data.fecha_cita,
              hora: this.data.hora,
              estado: this.data.estado,
              tipoespecialidad: this.data.procedimiento.tipo,
              odontologo: this.data.odontologo.nombre + ' ' + this.data.odontologo.apellido
            });
          });
        });
      }
    });
  }

  /**
   * Actualiza el estado de la cita
   */
  actualizarEstado(): void {
    if (this.form.value.id !== '' && this.form.value.tipoespecialidad !== '' && this.form.value.fechacita !== ''
      && this.form.value.hora !== '' && this.form.value.estado !== '' && this.form.value.odontologo !== ''){
      this.rolService.getAllRol().subscribe((datar: any) => {
        this.usuarioService.getAllUsuario().subscribe((datau: any) => {
          for (let i = 0; i < datar.length ; i++){
            for (const item of datau) {
              if (this.form.value.id === item.cedula && datar[i].nombre === 'paciente'){
                this.paciente.push(item.cedula);
                this.paciente.push(item.nombre);
                this.paciente.push(item.apellido);
                this.paciente.push(item.seudonimo);
                this.paciente.push(item.tipo_identificacion);
                this.paciente.push(item.correo);
                this.paciente.push(item.clave);
                this.paciente.push(String(item.fecha_nacimiento));
                this.paciente.push(item.celular);
                this.paciente.push(item.ciudad);
                this.paciente.push(item.departamento);
                this.paciente.push(item.pais);
              }
              if (datar[i].cedula === item.cedula && datar[i].nombre === 'odontologo'){
                let odonto = item.nombre + ' ' + item.apellido;
                if (odonto === this.form.value.odontologo){
                  this.odontologos.push(item.cedula);
                  this.odontologos.push(item.nombre);
                  this.odontologos.push(item.apellido);
                  this.odontologos.push(item.seudonimo);
                  this.odontologos.push(item.tipo_identificacion);
                  this.odontologos.push(item.correo);
                  this.odontologos.push(item.clave);
                  this.odontologos.push(String(item.fecha_nacimiento));
                  this.odontologos.push(item.celular);
                  this.odontologos.push(item.ciudad);
                  this.odontologos.push(item.departamento);
                  this.odontologos.push(item.pais);
                }
              }
            }
          }
          this.citaService.getAllCita().subscribe((dataAgendaAll: any) => {
            for (let n = 0 ; n < dataAgendaAll.length ; n++){
              if (dataAgendaAll[n].paciente.cedula === this.form.value.id){
                this.dataAgenda = {
                  idCita: dataAgendaAll[n].idCita,
                  hora: dataAgendaAll[n].hora,
                  descripcion: dataAgendaAll[n].descripcion,
                  estado: this.form.value.estado,
                  fecha_cita: dataAgendaAll[n].fecha_cita,
                  paciente: {
                    cedula: this.paciente[0],
                    nombre: this.paciente[1],
                    apellido: this.paciente[2],
                    seudonimo: this.paciente[3],
                    tipo_identificacion: this.paciente[4],
                    correo: this.paciente[5],
                    clave: this.paciente[6],
                    fecha_nacimiento: this.paciente[7],
                    celular: this.paciente[8],
                    ciudad: this.paciente[9],
                    departamento: this.paciente[10],
                    pais: this.paciente[11]
                  },
                  odontologo: {
                    cedula: this.odontologos[0],
                    nombre: this.odontologos[1],
                    apellido: this.odontologos[2],
                    seudonimo: this.odontologos[3],
                    tipo_identificacion: this.odontologos[4],
                    correo: this.odontologos[5],
                    clave: this.odontologos[6],
                    fecha_nacimiento: this.odontologos[7],
                    celular: this.odontologos[8],
                    ciudad: this.odontologos[9],
                    departamento: this.odontologos[10],
                    pais: this.odontologos[11]
                  },
                  procedimiento: {
                    idProcedimiento: dataAgendaAll[n].procedimiento.idProcedimiento,
                    tipo: dataAgendaAll[n].procedimiento.tipo
                  }
                };
              }
            }
            this.citaService.updateCita(this.dataAgenda, this.dataAgenda.idCita).subscribe((dataAgendaAgregar: any) => {
              window.location.reload();
              this.dialog.open(DialogCambiarEstadoComponent);
            });
          });
        });
      });
    } else {
      this.dialog.open(DialogFaltaRegistroPacienteComponent);
    }
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
  selector: 'app-dialog-cambiar-estado',
  templateUrl: 'dialog-cambiar-estado.html',
})
export class DialogCambiarEstadoComponent {}

@Component({
  selector: 'app-dialog-error-cambiar-estado',
  templateUrl: 'dialog-error-cambiar-estado.html',
})
export class DialogErrorCambiarEstadoComponent {}
