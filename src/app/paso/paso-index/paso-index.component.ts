import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { PasoService } from '../paso.service';
import { MensajeDialogComponent } from '../../mensaje-dialog/mensaje-dialog.component';
import {TramiteService} from '../../tramite/tramite.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-paso-index',
  templateUrl: './paso-index.component.html',
  styleUrls: ['./paso-index.component.css']
})
export class PasoIndexComponent implements OnInit {
  list: any = [];
  environment = environment;
  pasos: MatTableDataSource<any>;
  displayedColumns = ['titulo', 'descripcion', 'url', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
      private pasoService: PasoService,
      private route: ActivatedRoute,
      private tramiteService: TramiteService,
      private dialog: MatDialog
  ) {
      this.route.parent.params.subscribe(params => {
          console.log(params);
          this.hasManyPasos(params.id);
      });
  }

  hasManyPasos(id) {
      this.tramiteService.hasManyPasos(id).subscribe(res => {
          this.list = res;
          this.pasos = new MatTableDataSource(this.list);
          this.pasos.sort = this.sort;
          this.pasos.paginator = this.paginator;
      });
  }

  applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.pasos.filter = filterValue;
  }

  ngOnInit() {
  }

  openDialog(id, index) {
      const dialogRef = this.dialog.open(MensajeDialogComponent, {
          width : '450px',
          data : {
              info : '¿Esta seguro de eliminar el paso?',
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
      this.pasoService.destroy(id).subscribe(res => {
          this.list.splice(index, 1);
          this.pasos.data = this.list;
          this.pasos.sort = this.sort;
          this.pasos.paginator = this.paginator;
          console.log(res);
      });
  }
}