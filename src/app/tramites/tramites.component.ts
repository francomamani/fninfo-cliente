import {Component, OnInit, ViewChild} from '@angular/core';
import {TramiteService} from '../tramite/tramite.service';
import {environment} from '../../environments/environment.prod';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MensajeDialogComponent} from '../mensaje-dialog/mensaje-dialog.component';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.css']
})
export class TramitesComponent implements OnInit {
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

}
