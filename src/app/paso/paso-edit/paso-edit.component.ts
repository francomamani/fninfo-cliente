import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasoService} from '../paso.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {UbicacionService} from '../../ubicacion/ubicacion.service';

@Component({
  selector: 'app-paso-edit',
  templateUrl: './paso-edit.component.html',
  styleUrls: ['./paso-edit.component.css']
})
export class PasoEditComponent implements OnInit {
    @ViewChild('documento') documento;
    @ViewChild('imagen') imagen;
    pasoGroup: FormGroup;
    paso: any = null;
    ubicaciones: any = null;
    constructor(
        private pasoService: PasoService,
        private ubicacionService: UbicacionService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog) {

        this.ubicacionService.index().subscribe(res => {
          this.ubicaciones = res;
        });
        route.params.subscribe(res => {
            pasoService.show(res.id).subscribe( paso => {
                this.paso = paso;
                this.createForm(paso);
            });
        });
    }

    ngOnInit() {
    }

    createForm(paso) {
        console.log(paso.posicion);
        this.pasoGroup = this.fb.group({
            'id': new FormControl(paso.id, Validators.required),
            'tramite_id': new FormControl(paso.tramite_id, Validators.required),
            'titulo': new FormControl(paso.titulo, Validators.required),
            'descripcion': new FormControl(paso.descripcion, Validators.required),
            'url': new FormControl(paso.url),
            'ubicacion_id': new FormControl(paso.ubicacion_id ? paso.ubicacion_id : 0),
            'documento': new FormControl(paso.documento),
            'imagen': new FormControl(paso.imagen),
            'posicion': new FormControl(paso.posicion, Validators.required)
        });
    }

    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '450px',
            data: {
                info: res.mensaje + ' ¿Desea volver al listado de pasos de tramite?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if (response === true) {
                this.router.navigate(['/tramite/' + this.paso.tramite_id + '/paso']);
            }
        });

    }

    update() {
        this.pasoService
            .update(this.pasoGroup.value, this.pasoGroup.value.id)
            .subscribe(res => {
                console.log(res);
                this.openDialog(res);
            });
    }
}
