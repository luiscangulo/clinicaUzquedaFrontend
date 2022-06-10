import { Component, OnInit, ChangeDetectionStrategy, ViewChild,
  TemplateRef, Input, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from '../Service/usuario/usuario.service';
import {RoleService} from '../Service/role/role.service';
import {CitaService} from '../Service/cita/cita.service';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup, NgControl
} from '@angular/forms';

/**
 * Colores del estado de la cita
 */
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  gray: {
    primary: '#535454',
    secondary: '#b5b5b5',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#fcf0c2',
  },
  purple: {
    primary: '#66189f',
    secondary: '#c4aaf5',
  },
  green: {
    primary: '#109b37',
    secondary: '#95f1c0',
  },
  black: {
    primary: '#000000',
    secondary: '#000000',
  },
};

/**
 * Componente de la agenda, que se vera en vista de odontologo y secretaria
 */
@Component({
  selector: 'app-agenda',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) private modalContent: TemplateRef<any> | undefined;
  /**
   * Angular Calendar api con la que se muestra la Agenda
   */
  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  public modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;
  /**
   * Botones de acciones borrar y editar.
   */
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  /**
   * Variables utilizadas
   */
  refresh: Subject<any> = new Subject();
  form: FormGroup | any;
  public listaOdontologo: any[] = [];
  public listaAgenda: any[] = [];
  public dataUsuario: any = [];
  events: CalendarEvent[] = [];

  /**
   * Variables con la que se restringe el inicio de hora y minuto del dia
   * con el fin de hora y minuto del dia. Tambien se incluye la segmentacion de cada hora
   */
  @Input() hourSegmentHeight: number = 30;
  @Input() hourSegments: number = 2;
  @Input() dayStartHour: number = 8;
  @Input() dayStartMinute: number = 0;
  @Input() dayEndHour: number = 17;
  @Input() dayEndMinute: number = 0;

  activeDayIsOpen = true;

  /**
   * Se obtiene la lista de los Odontologos
   * @param modal - hace parte del Angular Calendar
   * @param usuarioService - Servicio del usuario
   * @param rolService - Servicio del rol del usuario en este caso del odontologo y del paciente
   * @param citaService - Servicio de la cita del usuario
   * @param fb - formulario
   */
  constructor(private modal: NgbModal,
              private usuarioService: UsuarioService,
              private rolService: RoleService,
              private citaService: CitaService,
              private fb: FormBuilder) {
    this.rolService.getAllRol().subscribe((datar: any) => {
      this.usuarioService.getAllUsuario().subscribe((datasO: any) => {
        for (let j = 0; j < datar.length; j++) {
          for (const item of datasO) {
            if (datar[j].cedula === item.cedula && datar[j].nombre === 'odontologo'){
              this.listaOdontologo.push(item.nombre + ' ' + item.apellido);
            }
          }
        }
        this.listaOdontologo.push('Todos');
      });
    });
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
   * Configuracion de los formularios
   * @private
   */
  private builForm(): void{
    this.form = this.fb.group({
      odontologo: [''],
    });
  }

  /**
   * Hace parte del Angular Calenar con el que se le clickea al dia del evento
   * @param date
   * @param events
   */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  /**
   * Hace parte de Angular Calendar es el que toma los cambios del evento
   * @param event
   * @param newStart
   * @param newEnd
   */
  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  /**
   * Hace parte Angular Calendar
   * @param action
   * @param event
   */
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  /**
   * Hace parte del Angular Calendar es el que añade los eventos
   */
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  /**
   * Hace parte del Angualr Calendar es el que borra los eventos
   * @param eventToDelete
   */
  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  /**
   * Hace parte del Angular Calendar es el que setea o modifica la vista los eventos
   * @param view
   */
  setView(view: CalendarView): void {
    this.view = view;
  }

  /**
   * Hace parte del Angular Calendar es que el que cierra o activa la vista del dia
   */
  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }
  /**
   * Metodo inicializador que hace funcionar los demas metodos que no dependen de un boton
   */
  ngOnInit(): void {
  }

  /**
   * Este metodo sirve al seleccionar un odontologo o la opcion de Todos, para cargar la lista
   * de los pacientes con cita
   */
  cargarData(): void{
    if (this.form.value.odontologo === '' || this.form.value.odontologo === 'Todos') {
      this.cargarAllData();
    } else {
      this.cargarPrueba();
    }
  }

  /**
   * Este metodo carga las citas con opcion de todos, la cual cargara las citas de todos los odontologos
   * listara por fecha y hora de inicio y fecha y hora de fin de la cita, el tendra en cuenta el color
   * de la cita, el titulo que seria el nmbre del paciente y el numero de identificacion. Aqui se añade
   * al array de eventos para ser mostrados en Angular Calendar.
   */
  cargarAllData(): void {
    let diaHoy = 0;
    let diaCita = 0;
    let mesHoy = 0;
    let mesCita = 0;
    let yearHoy = 0;
    let yearCita = 0;
    let fechaHoy = '';
    let fechaCita = '';
    this.events = [];
    this.citaService.getAllCita().subscribe((data: any) => {
      for (const i of data) {
        fechaCita = String(new Date(i.fecha_cita).toISOString());
        fechaHoy = String(new Date().toISOString());
        diaHoy = Number(String(new Date(fechaHoy).getDate()));
        diaCita = Number(String(new Date(fechaCita).getDate()));
        mesHoy = Number(String(new Date(fechaHoy).getMonth() + 1));
        mesCita = Number(String(new Date(fechaCita).getMonth() + 1));
        yearHoy = Number(String(new Date(fechaHoy).getFullYear()));
        yearCita = Number(String(new Date(fechaCita).getFullYear()));
        if (mesCita === mesHoy && diaCita >= diaHoy){
          const datosEventos = {
            start: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + String(i.hora) + ':00'),
            end: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + this.obtenerEndPrueba(i)),
            title: 'Paciente: ' + i.paciente.nombre  + ' ' + i.paciente.apellido + ' - Numero de Identificacion: ' + i.paciente.cedula,
            color: this.obtenerColorPrueba(i),
            resizable: {
              beforeStart: false,
              afterEnd: false,
            },
            draggable: false,
            cssClass: 'my-custom-class',
          };
          this.listaAgenda.push(datosEventos);
          this.events.push(datosEventos);
        } else if (mesCita > mesHoy && yearCita === yearHoy){
          const datosEventos = {
            start: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + String(i.hora) + ':00'),
            end: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + this.obtenerEndPrueba(i)),
            title: 'Paciente: ' + i.paciente.nombre  + ' ' + i.paciente.apellido + ' - Numero de Identificacion: ' + i.paciente.cedula,
            color: this.obtenerColorPrueba(i),
            resizable: {
              beforeStart: false,
              afterEnd: false,
            },
            draggable: false,
            cssClass: 'my-custom-class',
          };
          this.listaAgenda.push(datosEventos);
          this.events.push(datosEventos);
        } else if (mesCita < mesHoy && yearCita === (yearHoy + 1)) {
          const datosEventos = {
            start: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + String(i.hora) + ':00'),
            end: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + this.obtenerEndPrueba(i)),
            title: 'Paciente: ' + i.paciente.nombre  + ' ' + i.paciente.apellido + ' - Numero de Identificacion: ' + i.paciente.cedula,
            color: this.obtenerColorPrueba(i),
            resizable: {
              beforeStart: false,
              afterEnd: false,
            },
            draggable: false,
            cssClass: 'my-custom-class',
          };
          this.listaAgenda.push(datosEventos);
          this.events.push(datosEventos);
        }
      }
    });
  }

  /**
   * Este metodo carga las citas con opcion de un odontologo que elija, la cual cargara las citas
   * de un odontologo en especifico.
   * Listara por fecha y hora de inicio y fecha y hora de fin de la cita, el tendra en cuenta el color
   * de la cita, el titulo que seria el nmbre del paciente y el numero de identificacion. Aqui se añade
   * al array de eventos para ser mostrados en Angular Calendar.
   */
  cargarPrueba(): void {
    let diaHoy = 0;
    let diaCita = 0;
    let mesHoy = 0;
    let mesCita = 0;
    let yearHoy = 0;
    let yearCita = 0;
    let fechaHoy = '';
    let fechaCita = '';
    this.events = [];
    this.citaService.getAllCita().subscribe((data: any) => {
      for (const i of data) {
        fechaCita = String(new Date(i.fecha_cita).toISOString());
        fechaHoy = String(new Date().toISOString());
        diaHoy = Number(String(new Date(fechaHoy).getDate()));
        diaCita = Number(String(new Date(fechaCita).getDate()));
        mesHoy = Number(String(new Date(fechaHoy).getMonth() + 1));
        mesCita = Number(String(new Date(fechaCita).getMonth() + 1));
        yearHoy = Number(String(new Date(fechaHoy).getFullYear()));
        yearCita = Number(String(new Date(fechaCita).getFullYear()));
        if (mesCita === mesHoy && diaCita >= diaHoy){
          let odontologo = String(i.odontologo.nombre + ' ' + i.odontologo.apellido);
          if (odontologo === this.form.value.odontologo){
            const datosEventos = {
              start: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + String(i.hora) + ':00'),
              end: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + this.obtenerEndPrueba(i)),
              title: 'Paciente: ' + i.paciente.nombre  + ' ' + i.paciente.apellido + ' - Numero de Identificacion: ' + i.paciente.cedula,
              color: this.obtenerColorPrueba(i),
              resizable: {
                beforeStart: false,
                afterEnd: false,
              },
              draggable: false,
              cssClass: 'my-custom-class',
            };
            this.listaAgenda.push(datosEventos);
            this.events.push(datosEventos);
          }
        } else if (mesCita > mesHoy) {
          let odontologo = String(i.odontologo.nombre + ' ' + i.odontologo.apellido);
          if (odontologo === this.form.value.odontologo){
            const datosEventos = {
              start: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + String(i.hora) + ':00'),
              end: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + this.obtenerEndPrueba(i)),
              title: 'Paciente: ' + i.paciente.nombre  + ' ' + i.paciente.apellido + ' - Numero de Identificacion: ' + i.paciente.cedula,
              color: this.obtenerColorPrueba(i),
              resizable: {
                beforeStart: false,
                afterEnd: false,
              },
              draggable: false,
              cssClass: 'my-custom-class',
            };
            this.listaAgenda.push(datosEventos);
            this.events.push(datosEventos);
          }
        } else if (mesCita < mesHoy && yearCita === (yearHoy + 1)) {
          let odontologo = String(i.odontologo.nombre + ' ' + i.odontologo.apellido);
          if (odontologo === this.form.value.odontologo){
            const datosEventos = {
              start: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + String(i.hora) + ':00'),
              end: new Date(String(new Date(i.fecha_cita).toISOString().replace(/T.*$/, '')) + 'T' + this.obtenerEndPrueba(i)),
              title: 'Paciente: ' + i.paciente.nombre  + ' ' + i.paciente.apellido + ' - Numero de Identificacion: ' + i.paciente.cedula,
              color: this.obtenerColorPrueba(i),
              resizable: {
                beforeStart: false,
                afterEnd: false,
              },
              draggable: false,
              cssClass: 'my-custom-class',
            };
            this.listaAgenda.push(datosEventos);
            this.events.push(datosEventos);
          }
        }
      }
    });
  }

  /**
   * Metodo con el que se obtiene el color de la cita y lo coloca para el evento
   * depende del estado de la cita el color que se va a obtener y tambien de la cita registrada
   * por ello se pasa un parametro
   * @param i - parametro que cuya funcion hace es acceder al estado de la cita para conocer
   * que color colocarle
   */
  obtenerColorPrueba(i: any): any {
    let color = '';
    if (i.estado === 'sala espera'){
      return colors.yellow;
    }
    if (i.estado === 'cancelado'){
      return colors.gray;
    }
    if (i.estado === 'pendiente'){
      return colors.red;
    }
    if (i.estado === 'confirmado'){
      return colors.purple;
    }
    if (i.estado === 'esta en el box'){
      return colors.green;
    }
    return color;

  }

  /**
   * Metodo que ayyuda a obtener la hora final de la cita, esta en un lapso de 30 minutos caada cita
   * se calcula y uego se retorna solo la hora final en el frmato siguiente: 00:00:00
   * @param i - Esta variable se anza para acceder a la hora inicial de la cita y luego calcular
   * su hora final
   */
  obtenerEndPrueba(i: any): string {
    let minuto = Number(i.hora.substr(3,4)) + 30;
    let hora = 0;
    if (minuto === 60){
      hora = Number(i.hora.substr(0,2)) + 1;
      if (hora < 10){
        return '0' + hora + ':' + '00' + ':00';
      } else {
        return hora + ':' + '00' + ':00';
      }
    } else {
      if (Number(i.hora.substr(0,2)) < 10){
        return i.hora.substr(0,2) + ':' + String(Number(i.hora.substr(3,4)) + 30) + ':00';
      } else {
        return i.hora.substr(0,2) + ':' + String(Number(i.hora.substr(3,4)) + 30) + ':00';
      }
    }
  }
}
