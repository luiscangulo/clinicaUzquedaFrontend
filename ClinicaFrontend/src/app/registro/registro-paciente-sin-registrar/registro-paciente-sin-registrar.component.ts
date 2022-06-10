import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';
import {UsuarioService} from '../../Service/usuario/usuario.service';
import {RoleService} from '../../Service/role/role.service';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {
  DialogErrorRegistroPacienteComponent,
  DialogFaltaRegistroPacienteComponent,
  DialogRegistroPacienteComponent
} from '../registro-paciente/registro-paciente.component';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Router} from '@angular/router';

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
    public pais: string,
    public departamento: string,
    public ciudad: string,
    public seudonimo: string,
    public clave: string
  ) {}
}

/**
 * Componente de registrar paciente
 */
@Component({
  selector: 'app-registro-paciente-sin-registrar',
  templateUrl: './registro-paciente-sin-registrar.component.html',
  styleUrls: ['./registro-paciente-sin-registrar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: RegistroPacienteSinRegistrarComponent }]
})
export class RegistroPacienteSinRegistrarComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private roleService: RoleService,
              public dialog: MatDialog,
              private router: Router) {
  }

  /**
   * Atributos utilizados
   */
  form: FormGroup | any;
  data = [];
  datarol: any;
  datapais: any;
  datadepartamento: any;
  dataciudad: any;
  datapersona: any;
  mostrar: any = false;
  mensaje = '';
  mostrarmensaje = false;
  hide = true;
  contadorciudad = 0;
  contadordepartamento = 0;
  contadorpais = 0;
  contadorrol = 0;

  /**
   * Atributos requeridos por MatFormControl
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
      seudonimo: new FormControl(),
      clave: new FormControl(),
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
      seudonimo: ['', [Validators.required]],
      clave: ['', [Validators.required]],
    });
  }

  /**
   * Metodo para agregar un paciente
   */
  agregarUsuario(): void {
    // console.log('MAL MUY MAL ENTRO');
    if (this.form.value.id !== '' && this.form.value.tipoidentificacion !== '' && this.form.value.nombre !== ''
      && this.form.value.apellido !== '' && this.form.value.email !== '' && this.form.value.celular !== ''
      && this.form.value.pais !== '' && this.form.value.departamento !== '' && this.form.value.fechanacimiento !== ''
      && this.form.value.seudonimo !== '' && this.form.value.clave !== '' && this.form.value.ciudad !== ''){
      this.usuarioService.getAllUsuario().subscribe((datoId: any) => {
        let idencontrado = false;
        for (let i = 0 ; i < datoId.length ; i ++){
          if (this.form.value.id === datoId[i].cedula){
            idencontrado = true;
            break;
          }
        }
        if (idencontrado === true){
          this.mostrar = false;
          this.dialog.open(DialogErrorRegistroPacienteComponent);
        } else {
          if (this.form.value.clave.length > 7){
            this.roleService.getAllRol().subscribe((datar: any) => {
              this.contadorrol = datar.length + 1;
              this.datarol = {
                id: datar.length + 1,
                cedula: this.form.value.id,
                nombre: 'paciente'
              };
              this.roleService.addRol(this.datarol).subscribe((datara: any) => {
                // AGREGAR

                this.datapersona = {
                  cedula: this.form.value.id,
                  nombre: this.form.value.nombre,
                  apellido: this.form.value.apellido,
                  seudonimo: this.form.value.seudonimo,
                  tipo_identificacion: this.form.value.tipoidentificacion,
                  correo: this.form.value.email,
                  clave: this.form.value.clave,
                  fecha_nacimiento: this.form.value.fechanacimiento,
                  celular: this.form.value.celular,
                  ciudad: this.form.value.ciudad,
                  departamento: this.form.value.departamento,
                  pais: this.form.value.pais
                };
                this.usuarioService.addUsuario(this.datapersona).subscribe( (datau: any) => {
                  this.mostrar = true;
                  this.dialog.open(DialogRegistroPacienteComponent);
                  this.router.navigate(['/login']);
                });
                // FIN DE PERSONA
              });
            });
          } else {
            this.mostrarmensaje = true;
          }
        }
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
