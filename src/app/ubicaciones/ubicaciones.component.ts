import {Component, OnChanges, OnInit} from '@angular/core';
import {CategoriaUbicacionService} from '../categoria-ubicacion/categoria-ubicacion.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UbicacionService} from '../ubicacion/ubicacion.service';
import {environment} from '../../environments/environment.prod';
import * as ol from 'openlayers/dist/ol';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.css']
})
export class UbicacionesComponent implements OnInit, OnChanges{
  ubicaciones: Array<any>;
  ubicacion = {
      lat: -17.988922,
      lng: -67.137222
  };
  map: any;
  markerSource: any;
  zoom = 19;
  categoria_id = 0;
  categoriaUbicacion: any = null;
  environment = environment;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoriaUbicacionService: CategoriaUbicacionService,
              private ubicacionService: UbicacionService) {
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
          if (params.categoria_id) {
              this.categoria_id = params.categoria_id;
              this.categoriaUbicacionService.show(params.categoria_id).subscribe(categoriaUbicacion => {
                  this.categoriaUbicacion = categoriaUbicacion;
                  console.log(categoriaUbicacion);
              });
              this.hasManyUbicaciones(params.categoria_id);
          } else {
              this.index();
          }
      });
  }
  ngOnChanges() {
      this.route.params.subscribe(params => {
          if (params.categoria_id) {
              console.log(params.categoria_id);
              this.hasManyUbicaciones(params.categoria_id);
          } else {
              this.index();
          }
      });
  }
  index() {
      this.ubicacionService.index().subscribe((ubicaciones: Array<any> ) => {
          if (ubicaciones.length > 0) {
              this.ubicaciones = ubicaciones;
              this.createDOM(ubicaciones);
              if (ubicaciones.length > 0) {
                  this.ubicacion = ubicaciones[0];
              }
              this.loadMap();
              this.ubicaciones.map(ubicacion => {
                  this.addMarker(ubicacion.lng, ubicacion.lat, ubicacion.id, ubicacion.nombre);
              });
          } else {
              this.router.navigate(['inicio/ubicaciones']);
          }
      });
  }
  hasManyUbicaciones(categoria_id) {
      this.categoriaUbicacionService.hasManyUbicaciones(categoria_id).subscribe((ubicaciones: Array<any>) => {
              this.ubicaciones = ubicaciones;
              this.createDOM(ubicaciones);
              if (ubicaciones.length > 0) {
                this.ubicacion = ubicaciones[0];
              }
              this.loadMap();
              this.ubicaciones.map(ubicacion => {
                  this.addMarker(ubicacion.lng, ubicacion.lat, ubicacion.id, ubicacion.nombre);
              });
      });
  }
  createDOM(ubicaciones) {
      const map = document.getElementById('map');
      while (map.firstChild) {
          map.removeChild(map.firstChild);
      }
      ubicaciones.map(ubicacion => {
          const newElement = document.createElement('div');
          newElement.className = 'popup';
          newElement.id = ubicacion.id + '-' + ubicacion.nombre;
          newElement.innerHTML = ubicacion.nombre;
          map.appendChild(newElement);
      });
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
        view : new ol.View({
            center : ol.proj.fromLonLat([this.ubicacion.lng, this.ubicacion.lat]),
            zoom : this.zoom
        })
    });
/*    this.addMarker(this.ubicacion.lng, this.ubicacion.lat, this.ubicacion.id, this.ubicacion.nombre);*/
  }
  addMarker(lng, lat, ubicacion_id, ubicacion_nombre) {
    const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        title: 'example',
        name: 'Nueva ubicacion',
    });
    /*this.markerSource.clear();*/
    this.markerSource.addFeature(iconFeature);

    const popup = new ol.Overlay({
        position: ol.proj.fromLonLat([lng, lat]),
        element: document.getElementById(ubicacion_id + '-' + ubicacion_nombre)
    });
    this.map.addOverlay(popup);
  }
}
