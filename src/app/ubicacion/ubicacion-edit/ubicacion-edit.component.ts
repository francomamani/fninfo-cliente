import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UbicacionService} from '../ubicacion.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatDialog} from '@angular/material';
import * as ol from 'openlayers/dist/ol';
@Component({
  selector: 'app-ubicacion-edit',
  templateUrl: './ubicacion-edit.component.html',
  styleUrls: ['./ubicacion-edit.component.css']
})
export class UbicacionEditComponent implements OnInit {

  ubicacionGroup: FormGroup;
  ubicacion: any = null;
  map: any;
  markerSource: any;
  customView: any;
  zoom = 18;
  popup: any;
  constructor(private route: ActivatedRoute,
              private ubicacionService: UbicacionService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private router: Router) {
    this.route.params.subscribe(res => {
      ubicacionService.show(res.id).subscribe(ubicacion => {
        this.ubicacion = ubicacion;
        this.loadMap();
        this.createForm(ubicacion);
      });
    });
  }


  ngOnInit() {
  }
  loadMap() {
      this.markerSource = new ol.source.Vector();
      const markerStyle = new ol.style.Style({
          image: new ol.style.Icon(({
              anchor: [0.47, 32],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              opacity: 0.75,
              src: 'assets/marker32.png'
          }))
      });
      this.customView = new ol.View({
          center : ol.proj.fromLonLat([this.ubicacion.lng, this.ubicacion.lat]),
          zoom : this.zoom
      });
      this.map = new ol.Map({
          target: 'map',
          layers : [
              new ol.layer.Tile({
                  source: new ol.source.OSM()
              }),
              new ol.layer.Vector({
                  source: this.markerSource,
                  style: markerStyle
              })
          ],
          view : this.customView
      });
      this.addMarker(this.ubicacion.lng, this.ubicacion.lat);
      this.map.on('singleclick', event => {
          const lonLat = ol.proj.toLonLat(event.coordinate);
          this.ubicacion.lng = lonLat[0];
          this.ubicacion.lat = lonLat[1];
          this.addMarker(lonLat[0], lonLat[1]);
      });
  }
  createForm(ubicacion) {
      this.ubicacionGroup = this.fb.group({
          'id' : new FormControl(ubicacion.id, Validators.required),
          'categoria_ubicacion_id' : new FormControl(ubicacion.categoria_ubicacion_id, Validators.required),
          'nombre' : new FormControl(ubicacion.nombre, Validators.required),
          'descripcion' : new FormControl(ubicacion.descripcion, Validators.required),
          'lat' : new FormControl(ubicacion.lat, Validators.required),
          'lng' : new FormControl(ubicacion.lng, Validators.required),
          'planta' : new FormControl(ubicacion.planta, Validators.required)
      });
  }

  openDialog(res) {
      const dialogRef = this.dialog.open(MensajeDialogComponent, {
          width: '400px',
          data: {
              info: res.mensaje + ' ¿Desea volver al listado de ubicaciones?',
              has_action: true
          }
      });

      dialogRef.afterClosed().subscribe(response => {
          if(response === true){
            this.router.navigate(['/ubicacion/listar']);
          }
      });
  }

  update() {
    this.ubicacionService
        .update(this.ubicacionGroup.value, this.ubicacionGroup.value.id)
        .subscribe(res => {
            this.openDialog(res);
        });
  }

  updatePosition(event) {
    this.ubicacion.lat = event.coords.lat;
    this.ubicacion.lng = event.coords.lng;
    console.log(event.coords);
  }
    addMarker(lng, lat) {
        const iconFeatures = [];
        const iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
            name: 'Nueva ubicacion',
            population: 4000,
            rainfall: 500
        });
        this.markerSource.clear();
        this.markerSource.addFeature(iconFeature);
        this.popup = new ol.Overlay({
            position: ol.proj.fromLonLat([this.ubicacion.lng, this.ubicacion.lat]),
            element: document.getElementById('popup')
        });
        this.map.addOverlay(this.popup);
    }

}