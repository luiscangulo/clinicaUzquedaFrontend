import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { AgendaComponent } from './agenda/agenda.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroOdontologoComponent } from './registro/registro-odontologo/registro-odontologo.component';
import { RegistroCitaComponent } from './registro/registro-cita/registro-cita.component';
import { RegistroHomeComponent } from './registro/registro-home/registro-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroPacienteComponent } from './registro/registro-paciente/registro-paciente.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { UsuarioService } from './Service/usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { AppConfig } from './config/config';
import { LoginComponent } from './login/login.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { OdontologoComponent } from './odontologo/odontologo.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SecretariaComponent } from './secretaria/secretaria.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogRegistroCitaComponent} from './registro/registro-cita/registro-cita.component';
import {MatIconModule} from '@angular/material/icon';
import {DialogRegistroPacienteComponent} from './registro/registro-paciente/registro-paciente.component';
import {DialogErrorRegistroPacienteComponent} from './registro/registro-paciente/registro-paciente.component';
import { BuscarPacienteComponent } from './paciente/buscar-paciente/buscar-paciente.component';
import {MatTableModule} from '@angular/material/table';
import { ActualizarPacienteComponent } from './paciente/actualizar-paciente/actualizar-paciente.component';
import { ActualizarPacienteParaSecretariaComponent } from './paciente/actualizar-paciente-para-secretaria/actualizar-paciente-para-secretaria.component';
import {DialogActualizarPacienteComponent} from './paciente/actualizar-paciente/actualizar-paciente.component';
import {DialogActualizarPacienteParaSecretariaComponent} from './paciente/actualizar-paciente-para-secretaria/actualizar-paciente-para-secretaria.component';
import {DialogErrorActualizarPacienteParaSecretariaComponent} from './paciente/actualizar-paciente-para-secretaria/actualizar-paciente-para-secretaria.component';
import { PacienteHomeComponent } from './paciente/paciente-home/paciente-home.component';
import { ConfirmarCitaComponent } from './cita/confirmar-cita/confirmar-cita.component';
import {DialogConfirmarCitaComponent} from './cita/confirmar-cita/confirmar-cita.component';
import { CambiarEstadoComponent } from './cita/cambiar-estado/cambiar-estado.component';
import {DialogCambiarEstadoComponent} from './cita/cambiar-estado/cambiar-estado.component';
import {DialogRegistroOdontologoComponent} from './registro/registro-odontologo/registro-odontologo.component';
import {DialogErrorRegistroOdontologoComponent} from './registro/registro-odontologo/registro-odontologo.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { RegistroSecretariaComponent } from './registro/registro-secretaria/registro-secretaria.component';
import {DialogRegistroSecretariaComponent} from './registro/registro-secretaria/registro-secretaria.component';
import {DialogErrorRegistroSecretariaComponent} from './registro/registro-secretaria/registro-secretaria.component';
import { PqrsComponent } from './cita/pqrs/pqrs.component';
import { DebounceClickDirective } from './directivas/debounce-click/debounce-click.directive';
import {MatSortModule} from '@angular/material/sort';
import {DialogBuscarPacienteComponent} from './paciente/buscar-paciente/buscar-paciente.component';
import {DialogErrorRegistroCitaComponent} from './registro/registro-cita/registro-cita.component';
import {DialogErrorBuscarPacienteComponent} from './paciente/buscar-paciente/buscar-paciente.component';
import {DialogErrorActualizarPacienteComponent} from './paciente/actualizar-paciente/actualizar-paciente.component';
import {DialogErrorCambiarEstadoComponent} from './cita/cambiar-estado/cambiar-estado.component';
import {DialogErrorConfirmarCitaComponent} from './cita/confirmar-cita/confirmar-cita.component';
import { BannerComponent } from './banner-admin/banner/banner.component';
import { BannerPersonalComponent } from './banner-admin/banner-personal/banner-personal.component';
import {AppConfigJS} from './config/configJS';
import {DialogErrorCitaRegistroCitaComponent} from './registro/registro-cita/registro-cita.component';
import {DialogCancelarCitaComponent} from './cita/confirmar-cita/confirmar-cita.component';
import { PqrsPacienteComponent } from './cita/pqrs-paciente/pqrs-paciente.component';
import {DialogPqrsPacienteComponent} from './cita/pqrs-paciente/pqrs-paciente.component';
import {DialogErrorPqrsPacienteComponent} from './cita/pqrs-paciente/pqrs-paciente.component';
import {DialogPqrsComponent} from './cita/pqrs/pqrs.component';
// import { NgxCaptchaModule } from 'ngx-captcha';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecuperacionContrasenaComponent } from './recuperacion-contrasena/recuperacion-contrasena.component';
import { ActualizarDatosOdontologoComponent } from './odontologo/actualizar-datos-odontologo/actualizar-datos-odontologo.component';
import { ActualizarDatosSecretariaComponent } from './secretaria/actualizar-datos-secretaria/actualizar-datos-secretaria.component';
import {DialogActualizarOdontologoComponent} from './odontologo/actualizar-datos-odontologo/actualizar-datos-odontologo.component';
import {DialogActualizarSecretariaComponent} from './secretaria/actualizar-datos-secretaria/actualizar-datos-secretaria.component';
import {DialogErrorActualizarOdontologoComponent} from './odontologo/actualizar-datos-odontologo/actualizar-datos-odontologo.component';
import {DialogErrorActualizarSecretariaComponent} from './secretaria/actualizar-datos-secretaria/actualizar-datos-secretaria.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import {DialogErrorLoginComponent} from './login/login.component';
import {DialogFaltaRegistroPacienteComponent} from './registro/registro-paciente/registro-paciente.component';
// tslint:disable-next-line:max-line-length
import { RegistroPacienteSinRegistrarComponent } from './registro/registro-paciente-sin-registrar/registro-paciente-sin-registrar.component';
import {DialogListaPqrsVaciaComponent} from './cita/pqrs/pqrs.component';
import {DialogListaConfirmarCitaVaciaComponent} from './cita/confirmar-cita/confirmar-cita.component';
import {LoginService} from './Service/login/login.service';
import { ContactoComponent } from './contacto/contacto.component';
import {DialogErrorCaptchaComponent} from './login/login.component';
import {DialogRecuperacionContrasenaComponent} from './recuperacion-contrasena/recuperacion-contrasena.component';

/**
 * Modulos donde se registra todos los componentes directivas, servicios, dialogos y
 * cualquier modulo instalado, desde Angular Calendar como el uso de Materiia Angular
 */
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    NosotrosComponent,
    AgendaComponent,
    HomeComponent,
    RegistroOdontologoComponent,
    RegistroCitaComponent,
    RegistroHomeComponent,
    RegistroPacienteComponent,
    LoginComponent,
    OdontologoComponent,
    SecretariaComponent,
    DialogRegistroCitaComponent,
    DialogRegistroPacienteComponent,
    DialogErrorRegistroPacienteComponent,
    BuscarPacienteComponent,
    ActualizarPacienteComponent,
    ActualizarPacienteParaSecretariaComponent,
    DialogActualizarPacienteComponent,
    DialogActualizarPacienteParaSecretariaComponent,
    DialogErrorActualizarPacienteParaSecretariaComponent,
    PacienteHomeComponent,
    ConfirmarCitaComponent,
    DialogConfirmarCitaComponent,
    CambiarEstadoComponent,
    DialogCambiarEstadoComponent,
    DialogRegistroOdontologoComponent,
    DialogErrorRegistroOdontologoComponent,
    AdministradorComponent,
    RegistroSecretariaComponent,
    DialogRegistroSecretariaComponent,
    DialogErrorRegistroSecretariaComponent,
    PqrsComponent,
    DebounceClickDirective,
    DialogBuscarPacienteComponent,
    DialogErrorRegistroCitaComponent,
    DialogErrorBuscarPacienteComponent,
    DialogErrorActualizarPacienteComponent,
    DialogErrorCambiarEstadoComponent,
    DialogErrorConfirmarCitaComponent,
    BannerComponent,
    BannerPersonalComponent,
    DialogErrorCitaRegistroCitaComponent,
    DialogCancelarCitaComponent,
    PqrsPacienteComponent,
    DialogPqrsPacienteComponent,
    DialogErrorPqrsPacienteComponent,
    DialogPqrsComponent,
    RecuperacionContrasenaComponent,
    ActualizarDatosOdontologoComponent,
    ActualizarDatosSecretariaComponent,
    DialogActualizarOdontologoComponent,
    DialogActualizarSecretariaComponent,
    DialogErrorActualizarOdontologoComponent,
    DialogErrorActualizarSecretariaComponent,
    EspecialidadesComponent,
    UbicacionComponent,
    DialogErrorLoginComponent,
    DialogFaltaRegistroPacienteComponent,
    RegistroPacienteSinRegistrarComponent,
    DialogListaPqrsVaciaComponent,
    DialogListaConfirmarCitaVaciaComponent,
    ContactoComponent,
    DialogErrorCaptchaComponent,
    DialogRecuperacionContrasenaComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgScrollbarModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        HttpClientModule,
        MatCardModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        MatAutocompleteModule,
        MatTabsModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        RecaptchaModule
    ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
  ],
  providers: [ UsuarioService, AppConfig, AppConfigJS, LoginComponent, LoginService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
