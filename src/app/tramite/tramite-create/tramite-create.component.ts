import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TramiteService} from '../tramite.service';
import {MatDialog} from '@angular/material';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';

@Component({
  selector: 'app-tramite-create',
  templateUrl: './tramite-create.component.html',
  styleUrls: ['./tramite-create.component.css']
})
export class TramiteCreateComponent implements OnInit {
    tramiteGroup: FormGroup;
    constructor(
        private router: Router,
        private tramiteService: TramiteService,
        private fb: FormBuilder,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.createForm();
    }
    createForm() {
        this.tramiteGroup = this.fb.group({
            'titulo': new FormControl('', Validators.required),
            'descripcion': new FormControl('', Validators.required),
        });
    }

    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '500px',
            data: {
                info: res.mensaje + ' ¿Desea ir al listado de tramites?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if (response === true) {
                this.router.navigate(['/tramite/listar']);
            }
            this.tramiteGroup.reset();
        });
    }

    store() {
        this.tramiteService.store(this.tramiteGroup.value).subscribe(res => {
            this.openDialog(res);
        });
    }
}
