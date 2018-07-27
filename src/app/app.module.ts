import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule, MatCardModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatMenuModule, MatNativeDateModule,
    MatPaginatorModule, MatRadioModule,
    MatSelectModule,
    MatSidenavModule, MatTableModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment.prod';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { UbicacionCreateComponent } from './ubicacion/ubicacion-create/ubicacion-create.component';
import { UbicacionIndexComponent } from './ubicacion/ubicacion-index/ubicacion-index.component';
import { UbicacionService } from './ubicacion/ubicacion.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaCreateComponent } from './categoria/categoria-create/categoria-create.component';
import { CategoriaIndexComponent } from './categoria/categoria-index/categoria-index.component';
import { MensajeDialogComponent } from './mensaje-dialog/mensaje-dialog.component';
import { CategoriaUbicacionComponent } from './categoria-ubicacion/categoria-ubicacion.component';
import { CategoriaUbicacionCreateComponent } from './categoria-ubicacion/categoria-ubicacion-create/categoria-ubicacion-create.component';
import { CategoriaUbicacionIndexComponent } from './categoria-ubicacion/categoria-ubicacion-index/categoria-ubicacion-index.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { CategoriaUbicacionService } from './categoria-ubicacion/categoria-ubicacion.service';
import { UbicacionMapComponent } from './ubicacion/ubicacion-map/ubicacion-map.component';
import { UbicacionEditComponent } from './ubicacion/ubicacion-edit/ubicacion-edit.component';
import { CategoriaUbicacionEditComponent } from './categoria-ubicacion/categoria-ubicacion-edit/categoria-ubicacion-edit.component';
import { SliderComponent } from './slider/slider.component';
import { SliderCreateComponent } from './slider/slider-create/slider-create.component';
import { SliderIndexComponent } from './slider/slider-index/slider-index.component';
import {SliderService} from './slider/slider.service';
import { SliderEditComponent } from './slider/slider-edit/slider-edit.component';
import { UserComponent } from './user/user.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserIndexComponent } from './user/user-index/user-index.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import {UserService} from './user/user.service';
import { CategoriaEditComponent } from './categoria/categoria-edit/categoria-edit.component';
import {CategoriaService} from './categoria/categoria.service';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { NotificacionCreateComponent } from './notificacion/notificacion-create/notificacion-create.component';
import { NotificacionIndexComponent } from './notificacion/notificacion-index/notificacion-index.component';
import { NotificacionEditComponent } from './notificacion/notificacion-edit/notificacion-edit.component';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {RoutingStateService} from './routing-state.service';
import {NotificacionService} from './notificacion/notificacion.service';
import { TramiteComponent } from './tramite/tramite.component';
import { TramiteCreateComponent } from './tramite/tramite-create/tramite-create.component';
import { TramiteIndexComponent } from './tramite/tramite-index/tramite-index.component';
import { TramiteEditComponent } from './tramite/tramite-edit/tramite-edit.component';
import { PasoComponent } from './paso/paso.component';
import { PasoCreateComponent } from './paso/paso-create/paso-create.component';
import { PasoIndexComponent } from './paso/paso-index/paso-index.component';
import { PasoEditComponent } from './paso/paso-edit/paso-edit.component';
import {TramiteService} from './tramite/tramite.service';
import {PasoService} from './paso/paso.service';
import { EmergenteComponent } from './emergente/emergente.component';
import { EmergenteCreateComponent } from './emergente/emergente-create/emergente-create.component';
import { EmergenteEditComponent } from './emergente/emergente-edit/emergente-edit.component';
import {EmergenteService} from './emergente/emergente.service';
import { EmergenteIndexComponent } from './emergente/emergente-index/emergente-index.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { ImagenNotificacionComponent } from './imagen-notificacion/imagen-notificacion.component';
import { ImagenNotificacionCreateComponent } from './imagen-notificacion/imagen-notificacion-create/imagen-notificacion-create.component';
import { ImagenNotificacionIndexComponent } from './imagen-notificacion/imagen-notificacion-index/imagen-notificacion-index.component';
import { ImagenComponent } from './imagen/imagen.component';
import { ImagenCreateComponent } from './imagen/imagen-create/imagen-create.component';
import { ImagenIndexComponent } from './imagen/imagen-index/imagen-index.component';
import {ImagenService} from './imagen/imagen.service';
import {ImagenNotificacionService} from './imagen-notificacion/imagen-notificacion.service';
import { ImagenEditComponent } from './imagen/imagen-edit/imagen-edit.component';
import { ImagenNotificacionEditComponent } from './imagen-notificacion/imagen-notificacion-edit/imagen-notificacion-edit.component';
import { MyHttpLogInterceptor } from './my-http-log-interceptor';
import { UserChangePasswordComponent } from './user/user-change-password/user-change-password.component';
import { UbicacionesComponent } from './ubicaciones/ubicaciones.component';
import { InicioComponent } from './inicio/inicio.component';
import { TramitesComponent } from './tramites/tramites.component';
import { PasosComponent } from './pasos/pasos.component';
import { UbicacionesTramiteComponent } from './ubicaciones-tramite/ubicaciones-tramite.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'usuario', component: UserComponent, canActivate: [AuthGuard], children: [
        { path: 'crear', component: UserCreateComponent},
        { path: 'listar', component: UserIndexComponent},
        { path: 'editar/:id', component: UserEditComponent},
        { path: 'perfil', component: UserProfileComponent},
        { path: 'cambiar-password', component: UserChangePasswordComponent},
        { path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]},
    { path: 'categoria-ubicacion', component: CategoriaUbicacionComponent, canActivate: [AuthGuard], children: [
        { path: 'crear', component: CategoriaUbicacionCreateComponent},
        { path: 'listar', component: CategoriaUbicacionIndexComponent},
        { path: 'editar/:id', component: CategoriaUbicacionEditComponent},
        { path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]},
    { path: 'ubicacion', component: UbicacionComponent, children: [
        { path: 'crear', component: UbicacionCreateComponent},
        { path: 'listar', component: UbicacionIndexComponent},
        { path: 'listar/:categoria_ubicacion_id', component: UbicacionIndexComponent},
        { path: 'editar/:id', component: UbicacionEditComponent},
        { path: 'mapa/:id', component: UbicacionMapComponent},
        { path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]},
    { path: 'ubicacion/:id/imagen', component: ImagenComponent, canActivate: [AuthGuard], children: [
            { path: 'crear', component: ImagenCreateComponent},
            { path: 'listar', component: ImagenIndexComponent},
            { path: 'editar/:id', component: ImagenEditComponent},
            { path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]},
    {   path: 'slider', component: SliderComponent, canActivate: [AuthGuard], children: [
        { path: 'crear', component: SliderCreateComponent},
        { path: 'listar', component: SliderIndexComponent},
        { path: 'editar/:id', component: SliderEditComponent},
        { path: '', redirectTo: 'listar', pathMatch: 'full'},
    ]},
    { path: 'categoria', component: CategoriaComponent, canActivate: [AuthGuard], children: [
        { path: 'crear', component: CategoriaCreateComponent},
        { path: 'listar', component: CategoriaIndexComponent},
        { path: 'editar/:id', component: CategoriaEditComponent},
        { path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]},
    { path: 'notificacion', component: NotificacionComponent, canActivate: [AuthGuard], children: [
        { path: 'crear', component: NotificacionCreateComponent},
        { path: 'listar', component: NotificacionIndexComponent},
        { path: 'listar/:categoria_id', component: NotificacionIndexComponent},
        { path: 'editar/:id', component: NotificacionEditComponent},
        { path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]},
    { path: 'notificacion/:id/imagen', component: ImagenNotificacionComponent, canActivate: [AuthGuard], children: [
        { path: 'crear', component: ImagenNotificacionCreateComponent},
        { path: 'listar', component: ImagenNotificacionIndexComponent},
        { path: 'editar/:id', component: ImagenNotificacionEditComponent},
        { path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]},
    { path: 'emergente', component: EmergenteComponent, canActivate: [AuthGuard], children: [
        { path: 'crear', component: EmergenteCreateComponent},
        { path: 'listar', component: EmergenteIndexComponent},
        { path: 'editar/:id', component: EmergenteEditComponent},
        { path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]},
    { path: 'tramite', component: TramiteComponent, canActivate: [AuthGuard], children: [
        { path: 'crear', component: TramiteCreateComponent},
        { path: 'listar', component: TramiteIndexComponent},
        { path: 'editar/:id', component: TramiteEditComponent},
        { path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]},
    { path: 'tramite/:id/paso', component: PasoComponent, canActivate: [AuthGuard], children: [
        { path: 'crear', component: PasoCreateComponent},
        { path: 'listar', component: PasoIndexComponent},
        { path: 'editar/:id', component: PasoEditComponent},
        { path: 'mapa/:id', component: UbicacionMapComponent},
        { path: '', redirectTo: 'listar', pathMatch: 'full'}
    ]},
    { path: 'inicio', component: InicioComponent, children: [
        { path: 'tramites', component: TramitesComponent},
        { path: 'tramites/:id/pasos', component: PasosComponent},
        { path: 'ubicaciones', component: UbicacionesComponent },
        { path: 'ubicaciones/:categoria_id', component: UbicacionesComponent },
        { path: 'ubicaciones/tramite/:tramite_id', component: UbicacionesTramiteComponent },
        { path: 'mapa/:id', component: UbicacionMapComponent},
        { path: '', redirectTo: 'tramites', pathMatch: 'full'}
    ]},

    { path: '**', redirectTo: 'inicio', pathMatch: 'full'},
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    }
];
/*{ path: '**', component: PageNotFoundComponent }*/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UbicacionComponent,
    UbicacionCreateComponent,
    UbicacionIndexComponent,
    CategoriaComponent,
    CategoriaCreateComponent,
    CategoriaIndexComponent,
    MensajeDialogComponent,
    CategoriaUbicacionComponent,
    CategoriaUbicacionCreateComponent,
    CategoriaUbicacionIndexComponent,
    UbicacionMapComponent,
    UbicacionEditComponent,
    CategoriaUbicacionEditComponent,
    SliderComponent,
    SliderCreateComponent,
    SliderIndexComponent,
    SliderEditComponent,
    UserComponent,
    UserCreateComponent,
    UserIndexComponent,
    UserEditComponent,
    CategoriaEditComponent,
    NotificacionComponent,
    NotificacionCreateComponent,
    NotificacionIndexComponent,
    NotificacionEditComponent,
    TramiteComponent,
    TramiteCreateComponent,
    TramiteIndexComponent,
    TramiteEditComponent,
    PasoComponent,
    PasoCreateComponent,
    PasoIndexComponent,
    PasoEditComponent,
    EmergenteComponent,
    EmergenteCreateComponent,
    EmergenteEditComponent,
    EmergenteIndexComponent,
    UserProfileComponent,
    ImagenNotificacionComponent,
    ImagenNotificacionCreateComponent,
    ImagenNotificacionIndexComponent,
    ImagenComponent,
    ImagenCreateComponent,
    ImagenIndexComponent,
    ImagenEditComponent,
    ImagenNotificacionEditComponent,
    UserChangePasswordComponent,
    UbicacionesComponent,
    InicioComponent,
    TramitesComponent,
    PasosComponent,
    UbicacionesTramiteComponent
  ],
  imports: [
    BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      ColorPickerModule,
      MatButtonModule,
      MatInputModule,
      MatCardModule,
      MatFormFieldModule,
      MatSelectModule,
      MatSidenavModule,
      MatToolbarModule,
      MatIconModule,
      MatTableModule,
      MatPaginatorModule,
      MatDialogModule,
      MatMenuModule,
      MatNativeDateModule,
      MatDatepickerModule,
      MatRadioModule,
      MatChipsModule,
      MatTooltipModule,
      RouterModule.forRoot(appRoutes),
      AgmCoreModule.forRoot({
          apiKey: environment.apiKey
      })
  ],
    entryComponents: [MensajeDialogComponent],
  providers: [
                AuthGuard,
                AuthService,
                UserService,
                CategoriaService,
                UbicacionService,
                CategoriaUbicacionService,
                NotificacionService,
                SliderService,
                TramiteService,
                PasoService,
                EmergenteService,
                ImagenService,
                ImagenNotificacionService,
                { provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }