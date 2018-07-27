import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriaUbicacionService} from '../categoria-ubicacion.service';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categoria-ubicacion-create',
  templateUrl: './categoria-ubicacion-create.component.html',
  styleUrls: ['./categoria-ubicacion-create.component.css']
})
export class CategoriaUbicacionCreateComponent implements OnInit {
  @ViewChild('icono') icono;
  color: any = '#fff';
  categoriaUbicacionGroup: FormGroup;

  constructor(private categoriaUbicacionService: CategoriaUbicacionService,
              private dialog: MatDialog,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.categoriaUbicacionGroup = this.fb.group({
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
                info: res.mensaje + ' ¿Desea ir al listado de categorias de ubicaciones?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if ( response === true) {
                this.router.navigate(['/categoria-ubicacion/listar']);
            }
        });
    }

  store() {
      this.categoriaUbicacionGroup.patchValue({color: this.color});
      const formData = new FormData();
      const fileBrowser = this.icono.nativeElement;
      console.log(fileBrowser);
      if (fileBrowser.files[0]) {
          formData.append('icono', fileBrowser.files[0]);
          formData.append('nombre', this.categoriaUbicacionGroup.value.nombre);
          formData.append('descripcion', this.categoriaUbicacionGroup.value.descripcion);
          formData.append('color', this.color);
          console.log(formData);
          this.categoriaUbicacionService.store(formData).subscribe(res => {
              console.log(res);
              this.openDialog(res);
          });
          this.categoriaUbicacionGroup.reset();
      }
  }
}
