import {
  Component,
  ChangeDetectionStrategy,
  OnInit, ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, NgControl
} from '@angular/forms';
import { MatFormFieldControl} from '@angular/material/form-field';
import { UsuarioService } from '../../Service/usuario/usuario.service';
import { CitaService } from '../../Service/cita/cita.service';
import { RoleService } from '../../Service/role/role.service';
import { EnvioCorreoService } from '../../Service/envioCorreo/envio-correo.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

/** Data structure for cita. */
export class Cita {
  constructor(
    public id: string,
    public nombre: string,
    public apellido: string,
    public email: string,
    public tipoespecialidad: string,
    public fechacita: Date,
    public hora: string,
    public estado: string
  ) {}
}

/**
 * Componente de confirmar la cita
 */
@Component({
  selector: 'app-confirmar-cita',
  templateUrl: './confirmar-cita.component.html',
  styleUrls: ['./confirmar-cita.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: ConfirmarCitaComponent }]
})
export class ConfirmarCitaComponent implements MatFormFieldControl<Cita>, OnInit{
  data: any[] = [];
  public listaOdontologo: Array<any> = [];
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private citaService: CitaService,
              private rolService: RoleService,
              private envioCorreoService: EnvioCorreoService,
              public dialog: MatDialog) {
  }

  /**
   * Atributos utilizados
   */
  form: FormGroup | any;
  public res: Array<any> = [];
  public dataH = new Object();
  public odontologos: any[] = [];
  public paciente: any[] = [];
  dataAgenda: any;
  correoConfirmacion: any;
  mostrar: any = false;
  count = 0;
  public ident = 0;
  public nombre = '';
  public apellido = '';
  public email = '';
  public tipoespecialidad = '';
  public fechacita = new Date();
  public hora = '';
  public estado = '';

  /**
   * Atributos que son requeridos al utilizar MatFormControl
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

  columnas: string[] = ['cedula', 'nombres', 'correo', 'especialidad', 'fecha_cita', 'hora',
    'confirmar', 'cancelar'];

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
      odontologo: new FormControl(),
    });
  }

  /**
   * Validar que cada campo sea requerido
   * @private
   */
  private builForm(): void{
    this.form = this.fb.group({
      odontologo: ['']
    });
  }

  /**
   * Para controlar el doble click del boton ver tabla
   */
  log(): void {
    this.count++;
  }

  /**
   * Metodo para cambiar la cita a estado conformado
   * @param j - es el numero de la fila de la tabla
   */
  confirmarCita(j: number): void{
    this.obtenerOdonto();
    this.rolService.getAllRol().subscribe((datar: any) => {
      this.usuarioService.getAllUsuario().subscribe((datau: any) => {
        for (let i = 0; i < datar.length ; i++){
          for (const item of datau) {
            if (datar[i].cedula === item.cedula && datar[i].nombre === 'odontologo'){
              const odonto = item.nombre + ' ' + item.apellido;
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
            if (dataAgendaAll[n].paciente.cedula === this.res[j][0].id){
              this.dataAgenda = {
                idCita: dataAgendaAll[n].idCita,
                hora: dataAgendaAll[n].hora,
                descripcion: dataAgendaAll[n].descripcion,
                estado: 'confirmado',
                fecha_cita: dataAgendaAll[n].fecha_cita,
                paciente: {
                  cedula: dataAgendaAll[n].paciente.cedula,
                  nombre: dataAgendaAll[n].paciente.nombre,
                  apellido: dataAgendaAll[n].paciente.apellido,
                  seudonimo: dataAgendaAll[n].paciente.seudonimo,
                  tipo_identificacion: dataAgendaAll[n].paciente.tipo_identificacion,
                  correo: dataAgendaAll[n].paciente.correo,
                  clave: dataAgendaAll[n].paciente.clave,
                  fecha_nacimiento: dataAgendaAll[n].paciente.fecha_nacimiento,
                  celular: dataAgendaAll[n].paciente.celular,
                  ciudad: dataAgendaAll[n].paciente.ciudad,
                  departamento: dataAgendaAll[n].paciente.departamento,
                  pais: dataAgendaAll[n].paciente.pais
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
            const horaCita = Number(this.dataAgenda.hora.substring(0, 2));
            let horaFinal = '';
            if (horaCita < 13) {
              horaFinal = ' a.m.';
            } else {
              horaFinal = ' p.m.';
            }

            const mensaje = 'Hola' + this.dataAgenda.paciente.nombre
              + '\n\nSu cita para ' + this.dataAgenda.procedimiento.tipo
              + ', fue programada de forma exitosa. '
              + 'A continuaciòn, te entregamos toda la informaciòn'
              + ' que necesitas para tu atenciòn:'
              + '\n\nNombre: ' + this.dataAgenda.paciente.nombre
              + ' ' + this.dataAgenda.paciente.apellido
              + '\nFecha de la cita: ' + this.dataAgenda.fecha_cita.substring(0, 10)
              + '\nHora de la cita: ' + this.dataAgenda.hora + horaFinal
              + '\nOdontologo asignado: ' + this.dataAgenda.odontologo.nombre + ' ' + this.dataAgenda.odontologo.apellido
              + '\n\n Que tengas un buen dìa. \n\n' + 'Clínica Dental Alameda.\r\n'
              + 'Av Libertador Bernardo O´Higgins 4050\r\n'
              + 'Piso 4, Oficina 418. Estación Central.\r\n'
              + 'Edificio Alameda Oficinas.\r\n'
              + 'Metro San Alberto Hurtado Línea 1\r\n'
              + 'Tel +56 2 32451667 +56989053857';
            this.correoConfirmacion = {
              ownerRef: 'Clinica Dental Alameda',
              emailFrom: 'stgo.cda@gmail.com',
              emailTo: this.dataAgenda.paciente.correo,
              subject: 'Clinica Alameda te confirma tu cita!',
              text: mensaje
            };
            this.envioCorreoService.addCorreo(this.correoConfirmacion).subscribe((datae: any) => {
              this.dialog.open(DialogConfirmarCitaComponent);
              window.location.reload();
            });
          });
        });
      });
    });
  }

  /**
   * Metodos para cambiar el estado de la cita a cancelado
   * @param j - numero de la fila de la tabla
   */
  cancelarCita(j: number): void{
    this.obtenerOdonto();
    this.rolService.getAllRol().subscribe((datar: any) => {
      this.usuarioService.getAllUsuario().subscribe((datau: any) => {
        for (let i = 0; i < datar.length ; i++){
          for (const item of datau) {
            if (datar[i].cedula === item.cedula && datar[i].nombre === 'odontologo'){
              const odonto = item.nombre + ' ' + item.apellido;
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
            if (dataAgendaAll[n].paciente.cedula === this.res[j][0].id){
              this.dataAgenda = {
                idCita: dataAgendaAll[n].idCita,
                hora: dataAgendaAll[n].hora,
                descripcion: dataAgendaAll[n].descripcion,
                estado: 'cancelado',
                fecha_cita: dataAgendaAll[n].fecha_cita,
                paciente: {
                  cedula: dataAgendaAll[n].paciente.cedula,
                  nombre: dataAgendaAll[n].paciente.nombre,
                  apellido: dataAgendaAll[n].paciente.apellido,
                  seudonimo: dataAgendaAll[n].paciente.seudonimo,
                  tipo_identificacion: dataAgendaAll[n].paciente.tipo_identificacion,
                  correo: dataAgendaAll[n].paciente.correo,
                  clave: dataAgendaAll[n].paciente.clave,
                  fecha_nacimiento: dataAgendaAll[n].paciente.fecha_nacimiento,
                  celular: dataAgendaAll[n].paciente.celular,
                  ciudad: dataAgendaAll[n].paciente.ciudad,
                  departamento: dataAgendaAll[n].paciente.departamento,
                  pais: dataAgendaAll[n].paciente.pais
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
            const mensaje = 'Hola' + this.dataAgenda.paciente.nombre
              + '\n\nSu cita en la fecha: ' + this.dataAgenda.fecha_cita.substring(0, 10)
              + ' ha sido cancelada. Para mayor informaciòn contactase con nosotros: '
              + '\n\nTelefono: +56 2 32451667'
              + '\nMóvil-WhatsApp : +56 9 8905 3857'
              + '\n\n Que tengas un buen dìa. \n\n' + 'Clínica Dental Alameda.\r\n'
              + 'Av Libertador Bernardo O´Higgins 4050\r\n'
              + 'Piso 4, Oficina 418. Estación Central.\r\n'
              + 'Edificio Alameda Oficinas.\r\n'
              + 'Metro San Alberto Hurtado Línea 1\r\n'
              + 'Tel +56 2 32451667 +56989053857';
            this.correoConfirmacion = {
              ownerRef: 'Clinica Dental Alameda',
              emailFrom: 'stgo.cda@gmail.com',
              emailTo: this.dataAgenda.paciente.correo,
              subject: 'Clinica Alameda te cancela tu cita!',
              text: mensaje
            };
            this.envioCorreoService.addCorreo(this.correoConfirmacion).subscribe((datae: any) => {
              this.dialog.open(DialogCancelarCitaComponent);
              window.location.reload();
              /*
              this.citaService.deleteCita(Number(this.dataAgenda.idCita)).subscribe((datad: any) => {
              });
               */
            });
          });
        });
      });
    });
  }

  /**
   * Cargar las citas en estado pendiente al arraylist para poder mostrarlas en la tabla de confirmar y cancelar
   */
  cargar(): void{
    let diaHoy = 0;
    let diaCita = 0;
    let mesHoy = 0;
    let mesCita = 0;
    let yearHoy = 0;
    let yearCita = 0;
    let fechaHoy = '';
    let fechaCita = '';
    let contador = 0;
    this.citaService.getAllCita().subscribe( (data: any) => {
      let nombreCompleto = '';
      for (let i = 0; i < data.length ; i++) {
        if (data[i].estado === 'pendiente'){
          fechaCita = String(new Date(data[i].fecha_cita).toISOString());
          fechaHoy = String(new Date().toISOString());
          diaHoy = Number(String(new Date(fechaHoy).getDate()));
          diaCita = Number(String(new Date(fechaCita).getDate()));
          mesHoy = Number(String(new Date(fechaHoy).getMonth() + 1));
          mesCita = Number(String(new Date(fechaCita).getMonth() + 1));
          yearHoy = Number(String(new Date(fechaHoy).getFullYear()));
          yearCita = Number(String(new Date(fechaCita).getFullYear()));
          if (mesCita === mesHoy && diaCita >= diaHoy && yearCita === yearHoy){
            nombreCompleto = data[i].paciente.nombre + ' ' + data[i].paciente.apellido;
            this.dataH = [{
              id: String(data[i].paciente.cedula),
              name: nombreCompleto,
              list: String(data[i].paciente.correo),
              describe: String(data[i].procedimiento.tipo),
              date: String(new Date(data[i].fecha_cita).toLocaleDateString()),
              parent: String(data[i].hora)
            }];
            this.res.push(this.dataH);
            contador ++;
          } else if (mesCita > mesHoy && yearCita === yearHoy){
            nombreCompleto = data[i].paciente.nombre + ' ' + data[i].paciente.apellido;
            this.dataH = [{
              id: String(data[i].paciente.cedula),
              name: nombreCompleto,
              list: String(data[i].paciente.correo),
              describe: String(data[i].procedimiento.tipo),
              date: String(new Date(data[i].fecha_cita).toLocaleDateString()),
              parent: String(data[i].hora)
            }];
            this.res.push(this.dataH);
            contador ++;
          } else if (mesCita < mesHoy && yearCita === (yearHoy + 1)){
            nombreCompleto = data[i].paciente.nombre + ' ' + data[i].paciente.apellido;
            this.dataH = [{
              id: String(data[i].paciente.cedula),
              name: nombreCompleto,
              list: String(data[i].paciente.correo),
              describe: String(data[i].procedimiento.tipo),
              date: String(new Date(data[i].fecha_cita).toLocaleDateString()),
              parent: String(data[i].hora)
            }];
            this.res.push(this.dataH);
            contador ++;
          }
        }
      }
      if (contador === 0){
        this.dialog.open(DialogListaConfirmarCitaVaciaComponent);
      }
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
    });
  }
  obtenerOdonto(): void{

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
  selector: 'app-dialog-confirmar-cita',
  templateUrl: 'dialog-confirmar-cita.html',
})
export class DialogConfirmarCitaComponent {}

@Component({
  selector: 'app-dialog-cancelar-cita',
  templateUrl: 'dialog-cancelar-cita.html',
})
export class DialogCancelarCitaComponent {}

@Component({
  selector: 'app-dialog-error-confirmar-cita',
  templateUrl: 'dialog-error-confirmar-cita.html',
})
export class DialogErrorConfirmarCitaComponent {}

@Component({
  selector: 'app-dialog-lista-confirmar-cita-vacia',
  templateUrl: 'dialog-lista-confirmar-cita-vacia.html',
})
export class DialogListaConfirmarCitaVaciaComponent {}
