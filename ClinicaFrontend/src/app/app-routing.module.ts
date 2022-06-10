import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgendaComponent} from './agenda/agenda.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AppComponent} from './app.component';
import {RegistroHomeComponent} from './registro/registro-home/registro-home.component';
import {RegistroCitaComponent} from './registro/registro-cita/registro-cita.component';
import {RegistroOdontologoComponent} from './registro/registro-odontologo/registro-odontologo.component';
import {RegistroPacienteComponent} from './registro/registro-paciente/registro-paciente.component';
import {OdontologoComponent} from './odontologo/odontologo.component';
import {SecretariaComponent} from './secretaria/secretaria.component';
import {BuscarPacienteComponent} from './paciente/buscar-paciente/buscar-paciente.component';
import {ActualizarPacienteComponent} from './paciente/actualizar-paciente/actualizar-paciente.component';
import {ActualizarPacienteParaSecretariaComponent} from './paciente/actualizar-paciente-para-secretaria/actualizar-paciente-para-secretaria.component';
import {PacienteHomeComponent} from './paciente/paciente-home/paciente-home.component';
import {ConfirmarCitaComponent} from './cita/confirmar-cita/confirmar-cita.component';
import {AdministradorComponent} from './administrador/administrador.component';
import {RecuperacionContrasenaComponent} from './recuperacion-contrasena/recuperacion-contrasena.component';
import {ActualizarDatosOdontologoComponent} from './odontologo/actualizar-datos-odontologo/actualizar-datos-odontologo.component';
import {ActualizarDatosSecretariaComponent} from './secretaria/actualizar-datos-secretaria/actualizar-datos-secretaria.component';
import {RegistroPacienteSinRegistrarComponent} from './registro/registro-paciente-sin-registrar/registro-paciente-sin-registrar.component';

/**
 * Se guarda las rutas de cada componente y donde va a aaceder a cada una de ella e incluso a la principal
 */
const routes: Routes = [
  {
    path: 'agenda',
    component: AgendaComponent, // another child route component that the router renders
  },
  {
    path: 'login',
    component: LoginComponent, // another child route component that the router renders
  },
  {
    path: 'home',
    component: HomeComponent, // another child route component that the router renders
  },
  {
    path: 'odontologo',
    component: OdontologoComponent, // another child route component that the router renders
  },
  {
    path: 'secretaria',
    component: SecretariaComponent, // another child route component that the router renders
  },
  {
    path: 'administrador',
    component: AdministradorComponent, // another child route component that the router renders
  },
  {
    path: 'registro/registro-home',
    component: RegistroHomeComponent, // another child route component that the router renders
  },
  {
    path: 'registro/registro-cita',
    component: RegistroCitaComponent, // another child route component that the router renders
  },
  {
    path: 'registro/registro-odontologo',
    component: RegistroOdontologoComponent, // another child route component that the router renders
  },
  {
    path: 'registro/registro-paciente',
    component: RegistroPacienteComponent, // another child route component that the router renders
  },
  {
    path: 'registro/registro-paciente-sin-registrar',
    component: RegistroPacienteSinRegistrarComponent, // another child route component that the router renders
  },
  {
    path: 'paciente/buscar-paciente',
    component: BuscarPacienteComponent, // another child route component that the router renders
  },
  {
    path: 'paciente/actualizar-paciente',
    component: ActualizarPacienteComponent, // another child route component that the router renders
  },
  {
    path: 'paciente/actualizar-paciente-para-secretaria',
    component: ActualizarPacienteParaSecretariaComponent, // another child route component that the router renders
  },
  {
    path: 'paciente/paciente-home',
    component: PacienteHomeComponent, // another child route component that the router renders
  },
  {
    path: 'cita/confirmar-cita',
    component: ConfirmarCitaComponent, // another child route component that the router renders
  },
  {
    path: 'recuperacion-contrasena',
    component: RecuperacionContrasenaComponent, // another child route component that the router renders
  },
  {
    path: 'secretaria/actualizar-datos-secretaria',
    component: ActualizarDatosSecretariaComponent, // another child route component that the router renders
  },
  {
    path: 'odontologo/actualizar-datos-odontologo',
    component: ActualizarDatosOdontologoComponent, // another child route component that the router renders
  },
  {
    path: '',
    component: HomeComponent, // another child route component that the router renders
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
