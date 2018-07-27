import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {CategoriaService} from '../categoria.service';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {
    @ViewChild('icono') icono;
    color: any = '#fff';
    categoriaGroup: FormGroup;

    constructor(private categoriaService: CategoriaService,
                private dialog: MatDialog,
                private router: Router,
                private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    createForm(){
        this.categoriaGroup = this.fb.group({
            'nombre': new FormControl('', Validators.required),
            'descripcion': new FormControl('', Validators.required),
            'icono': new FormControl('', Validators.required),
            'color': new FormControl('', Validators.required)
        });
    }
    
    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '400px',
            data: {
                info: res.mensaje + ' ¿Desea ir al listado de categorias?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if ( response === true) {
                this.router.navigate(['/categoria/listar']);
            }
        });
    }

    store() {
        this.categoriaGroup.patchValue({color: this.color});
        const formData = new FormData();
        const fileBrowser = this.icono.nativeElement;
        console.log(fileBrowser);
        if (fileBrowser.files[0]) {
            formData.append('icono', fileBrowser.files[0]);
            formData.append('nombre', this.categoriaGroup.value.nombre);
            formData.append('descripcion', this.categoriaGroup.value.descripcion);
            formData.append('color', this.color);
            console.log(formData);
            this.categoriaService.store(formData).subscribe(res => {
                console.log(res);
                this.openDialog(res);
            });
            this.categoriaGroup.reset();
        }
    }
}
