import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {NotificacionService} from '../notificacion.service';
import {CategoriaService} from '../../categoria/categoria.service';
import { environment } from '../../../environments/environment.prod';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-notificacion-index',
  templateUrl: './notificacion-index.component.html',
  styleUrls: ['./notificacion-index.component.css']
})
export class NotificacionIndexComponent implements OnInit {
    list: any = [];
    environment = environment;
    notificaciones: MatTableDataSource<any>;
    displayedColumns = ['prioridad', 'categoria', 'titulo', 'contenido', 'imagen', 'fecha_inicio', 'fecha_fin', 'web', 'acciones'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private notificacionService: NotificacionService,
        private categoriaService: CategoriaService,
        private route: ActivatedRoute,
        private dialog: MatDialog) {
        route.params.subscribe((params: any) => {
            console.log(params['categoria_id']);
            if (params['categoria_id']) {
                this.hasManyNotificaciones(params['categoria_id']);
            } else {
                this.index();
            }
        });

    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.notificaciones.filter = filterValue;
    }

    ngOnInit() {
    }

    openDialog(id, index) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width : '450px',
            data : {
                info : '¿Esta seguro de eliminar la notificacion?',
                has_action: true
            }
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res === true) {
                this.destroy(id, index);
            }
        });
    }

    index() {
        this.notificacionService.index().subscribe(res => {
            this.list = res;
            this.notificaciones = new MatTableDataSource(this.list);
            this.notificaciones.sort = this.sort;
            this.notificaciones.paginator = this.paginator;
        });
    }
    hasManyNotificaciones(categoria_id) {
        this.categoriaService.hasManyNotificaciones(categoria_id).subscribe(res => {
            this.list = res;
            this.notificaciones = new MatTableDataSource(this.list);
            this.notificaciones.sort = this.sort;
            this.notificaciones.paginator = this.paginator;
        });
    }
    destroy(id, index) {
        this.notificacionService.destroy(id).subscribe(res => {
            this.list.splice(index, 1);
            this.notificaciones.data = this.list;
            this.notificaciones.sort = this.sort;
            this.notificaciones.paginator = this.paginator;
            console.log(res);
        });
    }
}