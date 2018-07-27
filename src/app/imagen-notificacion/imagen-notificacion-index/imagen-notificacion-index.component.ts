import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {environment} from '../../../environments/environment.prod';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {ImagenNotificacionService} from '../imagen-notificacion.service';
import {NotificacionService} from '../../notificacion/notificacion.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-imagen-notificacion-index',
  templateUrl: './imagen-notificacion-index.component.html',
  styleUrls: ['./imagen-notificacion-index.component.css']
})
export class ImagenNotificacionIndexComponent implements OnInit {
    list: any = [];
    environment = environment;
    imagen_notificaciones: MatTableDataSource<any>;
    displayedColumns = ['descripcion', 'imagen', 'acciones'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private imagenNotificacionService: ImagenNotificacionService,
        private notificacionService: NotificacionService,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) {
        this.route.parent.params.subscribe((res: any) => {
            console.log(res.id);
            this.notificacionService.getImagenNotificaciones(res.id).subscribe((response: any) => {
                this.list = response;
                console.log(response);
                this.imagen_notificaciones = new MatTableDataSource(this.list);
                this.imagen_notificaciones.sort = this.sort;
                this.imagen_notificaciones.paginator = this.paginator;
            });
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.imagen_notificaciones.filter = filterValue;
    }

    ngOnInit() {
    }

    openDialog(id, index) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width : '450px',
            data : {
                info : '¿Esta seguro de eliminar la imagen de la notificacion?',
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
        this.imagenNotificacionService.destroy(id).subscribe(res => {
            this.list.splice(index, 1);
            this.imagen_notificaciones.data = this.list;
            this.imagen_notificaciones.sort = this.sort;
            this.imagen_notificaciones.paginator = this.paginator;
            console.log(res);
        });
    }
}
