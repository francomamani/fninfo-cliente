import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {TramiteService} from '../tramite.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';

@Component({
  selector: 'app-tramite-edit',
  templateUrl: './tramite-edit.component.html',
  styleUrls: ['./tramite-edit.component.css']
})
export class TramiteEditComponent implements OnInit {
    tramiteGroup: FormGroup;
    tramite: any = null;
    constructor(
        private tramiteService: TramiteService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog) {

        route.params.subscribe(res => {
            tramiteService.show(res.id).subscribe( tramite => {
                this.tramite = tramite;
                this.createForm(tramite);
            });
        });
    }

    ngOnInit() {
    }

    createForm(tramite) {
        this.tramiteGroup = this.fb.group({
            'id': new FormControl(tramite.id, Validators.required),
            'titulo': new FormControl(tramite.titulo, Validators.required),
            'descripcion': new FormControl(tramite.descripcion, Validators.required),
        });
    }

    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '450px',
            data: {
                info: res.mensaje + ' ¿Desea volver al listado de tramites?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if (response === true) {
                this.router.navigate(['/tramite/listar']);
            }
        });

    }

    update() {
        this.tramiteService
            .update(this.tramiteGroup.value, this.tramiteGroup.value.id)
            .subscribe(res => {
                console.log(res);
                this.openDialog(res);
            });
    }
}
