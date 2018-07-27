import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UbicacionService} from '../ubicacion.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {CategoriaUbicacionService} from '../../categoria-ubicacion/categoria-ubicacion.service';

@Component({
  selector: 'app-ubicacion-index',
  templateUrl: './ubicacion-index.component.html',
  styleUrls: ['./ubicacion-index.component.css']
})
export class UbicacionIndexComponent {
    environment = environment;
    ubicacion: any = null;
    fondo: '#005c4d';
    list: any = [];
    ubicaciones: MatTableDataSource<any>;
    displayedColumns = ['nombre', 'descripcion', 'planta', 'imagen', 'mapa', 'acciones'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
                private categoriaUbicacionService: CategoriaUbicacionService,
                private ubicacionService: UbicacionService,
                private router: Router,
                private dialog: MatDialog,
                private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            if (params['categoria_ubicacion_id']) {
                this.hasManyUbicaciones(params.categoria_ubicacion_id);
            } else {
                this.index();
            }
        });

        console.log(router);
    }

    index() {
        this.ubicacionService.index().subscribe(res => {
            this.list = res;
            this.ubicaciones = new MatTableDataSource(this.list);
            this.ubicaciones.sort = this.sort;
            console.log(this.ubicaciones);
            this.ubicaciones.paginator = this.paginator;
        });
    }

    hasManyUbicaciones(categoria_ubicacion_id) {
        this.categoriaUbicacionService.hasManyUbicaciones(categoria_ubicacion_id).subscribe(res => {
            this.list = res;
            this.ubicaciones = new MatTableDataSource(this.list);
            this.ubicaciones.sort = this.sort;
            this.ubicaciones.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.ubicaciones.filter = filterValue;
    }
    showMap(id) {
        this.router.navigate(['ubicacion/mapa/' + id ]);
    }

    openDialog(id, index) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '400px',
            data: {
                info: '¿Esta seguro de eliminar este registro?',
                has_action: true
            }
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res === true){
                this.destroy(id, index);
                console.log('Registro eliminado exitosamente');
            }
        });

    }

    destroy(id, index) {
        this.ubicacionService.destroy(id).subscribe(res => console.log(res));
        this.list.splice(index, 1);
        this.ubicaciones.data = this.list;
    }
}
