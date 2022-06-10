import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, NgControl,
  Validators
} from '@angular/forms';
import { MatFormFieldControl} from '@angular/material/form-field';
import { UsuarioService } from '../../Service/usuario/usuario.service';
import { TipopqrsService } from '../../Service/tipopqrs/tipopqrs.service';
import { PqrsService } from '../../Service/pqrs/pqrs.service';
import { RoleService } from '../../Service/role/role.service';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {DialogFaltaRegistroPacienteComponent} from '../../registro/registro-paciente/registro-paciente.component';

/** Data structure for cita. */
export class PQRS {
  constructor(
    public id: string,
    public descripcion: string
  ) {}
}

/**
 * Componente del pqrs
 */
@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: PqrsComponent }]
})
export class PqrsComponent implements MatFormFieldControl<PQRS>, OnInit {

  /**
   * Atributos requeridos cuando se utiliza MatFormFieldControl
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
  value: PQRS | null | undefined;

  /**
   * Atributos utilizados
   */
  public res: Array<any> = [];
  data: any;
  idpqrsUpdate = 0;
  dataPqrs: any;
  form: FormGroup | any;
  count = 0;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private pqrsService: PqrsService,
              private rolService: RoleService,
              private tipopqrsService: TipopqrsService,
              public dialog: MatDialog) { }

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
      respuesta: new FormControl(),
    });
  }
  /**
   * Validar que cada campo sea requerido
   * @private
   */
  private builForm(): void{
    this.form = this.fb.group({
      respuesta: ['', [Validators.required]],
    });
  }

  /**
   * Carga el arraylist de pqrs sin responder para mostrarlas en la tabla del administrador
   */
  cargar(): void{
    let contador = 0;
    this.res = [];
    this.pqrsService.getAllPqrs().subscribe((datap: any) => {
      for (let i = 0; i < datap.length; i++) {
        if (datap[i].respuesta === ''){
          this.data = [{
            id: datap[i].idPQRS,
            date: datap[i].tipopqrs.tipo,
            name: datap[i].descripcion
          }];
          this.res.push(this.data);
        } else {
          contador ++;
        }
      }
      if (contador === datap.length){
        this.dialog.open(DialogListaPqrsVaciaComponent);
      }
    });
  }
  /**
   * Enviar la respuesta de las PQRS al paciente.
   */
  enviopqrs(j: number): void{
    if (this.form.value.respuesta !== ''){
      this.pqrsService.getAllPqrs().subscribe((datap: any) => {
        for (let i = 0; i < datap.length; i++) {
          if (datap[i].idPQRS === this.res[j][0].id){
            this.idpqrsUpdate = datap[i].idPQRS;
            this.dataPqrs = {
              idPQRS: datap[i].idPQRS,
              descripcion: datap[i].descripcion,
              respuesta: this.form.value.respuesta,
              moderador: {
                cedula: datap[i].moderador.cedula,
                nombre: datap[i].moderador.nombre,
                apellido: datap[i].moderador.apellido,
                seudonimo: datap[i].moderador.seudonimo,
                tipo_identificacion: datap[i].moderador.tipo_identificacion,
                correo: datap[i].moderador.correo,
                clave: datap[i].moderador.clave,
                fecha_nacimiento: datap[i].moderador.fecha_nacimiento,
                celular: datap[i].moderador.celular,
                ciudad: datap[i].moderador.ciudad,
                departamento: datap[i].moderador.departamento,
                pais: datap[i].moderador.pais
              },
              paciente: {
                cedula: datap[i].paciente.cedula,
                nombre: datap[i].paciente.nombre,
                apellido: datap[i].paciente.apellido,
                seudonimo: datap[i].paciente.seudonimo,
                tipo_identificacion: datap[i].paciente.tipo_identificacion,
                correo: datap[i].paciente.correo,
                clave: datap[i].paciente.clave,
                fecha_nacimiento: datap[i].paciente.fecha_nacimiento,
                celular: datap[i].paciente.celular,
                ciudad: datap[i].paciente.ciudad,
                departamento: datap[i].paciente.departamento,
                pais: datap[i].paciente.pais
              },
              tipopqrs: {
                idPQRS: datap[i].tipopqrs.idPQRS,
                tipo: datap[i].tipopqrs.tipo
              }
            };
          }
        }
        this.pqrsService.updatePqrs(this.dataPqrs, this.idpqrsUpdate).subscribe((datapu: any) => {
          this.cargar();
          window.location.reload();
          this.dialog.open(DialogPqrsComponent);
        });
      });
    } else {
      this.dialog.open(DialogFaltaRegistroPacienteComponent);
    }
  }

  /**
   * Cuenta el click
   */
  log(): void {
    this.count++;
  }

}

/**
 * Se llaman los dialogos para mostrar los mensajes correspondientes
 */
@Component({
  selector: 'app-dialog-pqrs',
  templateUrl: 'dialog-pqrs.html',
})
export class DialogPqrsComponent {}

@Component({
  selector: 'app-dialog-lista-pqrs-vacia',
  templateUrl: 'dialog-lista-pqrs-vacia.html',
})
export class DialogListaPqrsVaciaComponent {}
