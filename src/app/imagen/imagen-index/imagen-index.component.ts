import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {environment} from '../../../environments/environment.prod';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {ImagenService} from '../imagen.service';
import {ActivatedRoute} from '@angular/router';
import {UbicacionService} from '../../ubicacion/ubicacion.service';

@Component({
  selector: 'app-imagen-index',
  templateUrl: './imagen-index.component.html',
  styleUrls: ['./imagen-index.component.css']
})
export class ImagenIndexComponent implements OnInit {
    list: any = [];
    environment = environment;
    imagenes: MatTableDataSource<any>;
    displayedColumns = ['descripcion', 'imagen', 'acciones'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private imagenService: ImagenService,
        private ubicacionService: UbicacionService,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) {
        this.route.parent.params.subscribe((res: any) => {
            console.log(res.id);
            this.ubicacionService.getImagenes(res.id).subscribe(res => {
                this.list = res;
                console.log(res);
                this.imagenes = new MatTableDataSource(this.list);
                this.imagenes.sort = this.sort;
                this.imagenes.paginator = this.paginator;
            });
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.imagenes.filter = filterValue;
    }

    ngOnInit() {
    }

    openDialog(id, index) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width : '450px',
            data : {
                info : '¿Esta seguro de eliminar la imagen de la ubicacion?',
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
        this.imagenService.destroy(id).subscribe(res => {
            this.list.splice(index, 1);
            this.imagenes.data = this.list;
            this.imagenes.sort = this.sort;
            this.imagenes.paginator = this.paginator;
            console.log(res);
        });
    }
}
