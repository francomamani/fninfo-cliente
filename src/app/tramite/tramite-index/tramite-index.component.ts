import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort, MatDialog} from '@angular/material';
import { environment } from '../../../environments/environment.prod';
import {TramiteService} from '../tramite.service';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';

@Component({
  selector: 'app-tramite-index',
  templateUrl: './tramite-index.component.html',
  styleUrls: ['./tramite-index.component.css']
})
export class TramiteIndexComponent implements OnInit {
    list: any = [];
    environment = environment;
    tramites: MatTableDataSource<any>;

    displayedColumns = ['titulo', 'descripcion', 'acciones'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private tramiteService: TramiteService,
        private dialog: MatDialog
    ) {
        this.tramiteService.index().subscribe(res => {
            this.list = res;
            this.tramites = new MatTableDataSource(this.list);
            this.tramites.sort = this.sort;
            this.tramites.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.tramites.filter = filterValue;
    }

    ngOnInit() {
    }

    openDialog(id, index) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width : '450px',
            data : {
                info : '¿Esta seguro de eliminar el tramite?',
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
        this.tramiteService.destroy(id).subscribe(res => {
            this.list.splice(index, 1);
            this.tramites.data = this.list;
            this.tramites.sort = this.sort;
            this.tramites.paginator = this.paginator;
            console.log(res);
        });
    }
    logueado() {
        if (localStorage.getItem('token')) {
            return true;
        } else {
            return false;
        }
    }
}
