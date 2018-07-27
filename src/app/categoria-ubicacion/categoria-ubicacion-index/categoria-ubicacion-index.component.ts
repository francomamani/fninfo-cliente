import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CategoriaUbicacionService} from '../categoria-ubicacion.service';
import { environment } from '../../../environments/environment.prod';
import {Router} from '@angular/router';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';

@Component({
  selector: 'app-categoria-ubicacion-index',
  templateUrl: './categoria-ubicacion-index.component.html',
  styleUrls: ['./categoria-ubicacion-index.component.css']
})
export class CategoriaUbicacionIndexComponent implements OnInit {
    list: any = [];
    environment = environment;
    categoria_ubicaciones: MatTableDataSource<any>;
    displayedColumns = ['nombre', 'descripcion', 'icono', 'acciones'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private categoriaUbicacionService: CategoriaUbicacionService,
        private dialog: MatDialog
    ) {
        this.categoriaUbicacionService.index().subscribe(res => {
            this.list = res;
            this.categoria_ubicaciones = new MatTableDataSource(this.list);
            this.categoria_ubicaciones.sort = this.sort;
            this.categoria_ubicaciones.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.categoria_ubicaciones.filter = filterValue;
    }

    ngOnInit() {
    }

    openDialog(id, index) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
           width : '450px',
           data : {
               info : '¿Esta seguro de eliminar la categoria de ubicacion?',
               has_action: true
           }
        });
        dialogRef.afterClosed().subscribe(res => {
           if (res === true) {
               this.destroy(id, index);
           }
        });
    }

    destroy(id, index) {
        this.categoriaUbicacionService.destroy(id).subscribe(res => {
            this.list.splice(index, 1);
            this.categoria_ubicaciones.data = this.list;
            this.categoria_ubicaciones.sort = this.sort;
            this.categoria_ubicaciones.paginator = this.paginator;
            console.log(res);
        });
    }
}