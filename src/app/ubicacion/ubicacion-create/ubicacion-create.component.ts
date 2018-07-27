import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import {UbicacionService} from '../ubicacion.service';
import {MatDialog} from '@angular/material';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {CategoriaUbicacionService} from '../../categoria-ubicacion/categoria-ubicacion.service';
import {Router} from '@angular/router';
import * as ol from 'openlayers/dist/ol';
@Component({
  selector: 'app-ubicacion-create',
  templateUrl: './ubicacion-create.component.html',
  styleUrls: ['./ubicacion-create.component.css']
})
export class UbicacionCreateComponent implements OnInit {
  @ViewChild('imagen') imagen;
  ubicacion = {
    lat: -17.9897393,
    lng: -67.1349911,
    nombre : 'nueva ubicacion'
  };
  zoom = 18;
  map: any;
  markerSource: any;
  popup: any;
  customView: any;
  categoria_ubicacion_id = 0;
  ubicacionGroup: FormGroup;
  categoria_ubicaciones: any = [];
  constructor(private fb: FormBuilder,
              private router: Router,
              private categoriaUbicacionService: CategoriaUbicacionService,
              private ubicacionService: UbicacionService,
              public dialog: MatDialog) { }

  ngOnInit() {
      this.markerSource = new ol.source.Vector();
      const markerStyle = new ol.style.Style({
          image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
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
      this.categoriaUbicacionService.index().subscribe(res => this.categoria_ubicaciones = res);
      this.createForm();
  }
  openDialog(res) {
      const dialogRef = this.dialog.open(MensajeDialogComponent, {
          width: '400px',
          data: {
              info: res.mensaje,
              has_action: true
          }
      });
      dialogRef.afterClosed().subscribe((response: any) => {
          if (response === true) {
              this.router.navigate(['/ubicacion/listar']);
          }
      });
  }
  createForm() {
      this.ubicacionGroup = this.fb.group({
          'categoria_ubicacion_id': new FormControl(0, Validators.required),
          'nombre': new FormControl('', Validators.required),
          'descripcion': new FormControl('', Validators.required),
          'lat': new FormControl(-17.9897393, Validators.required),
          'lng': new FormControl(-67.1349911, Validators.required),
          'planta': new FormControl(0, Validators.required),
          'imagen': new FormControl('')
      });
  }

  store() {
      const formData = new FormData();
      const fileBrowser = this.imagen.nativeElement;
      console.log(fileBrowser);
      if (fileBrowser.files[0]) {
          formData.append('imagen', fileBrowser.files[0]);
          formData.append('categoria_ubicacion_id', this.ubicacionGroup.value.categoria_ubicacion_id);
          formData.append('nombre', this.ubicacionGroup.value.nombre);
          formData.append('descripcion', this.ubicacionGroup.value.descripcion);
          formData.append('lat', this.ubicacionGroup.value.lat);
          formData.append('lng', this.ubicacionGroup.value.lng);
          formData.append('planta', this.ubicacionGroup.value.planta);
          console.log(formData);
          this.ubicacionService.store(formData).subscribe(res => {
              this.ubicacionGroup.reset();
              this.openDialog(res);
          });
      }
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