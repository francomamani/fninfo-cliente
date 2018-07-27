import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class UbicacionService {

  headers: any = null;
  constructor(private http: HttpClient) {
    this.headers = {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
    };
  }

  index() {
    return this.http.get(environment.base + 'ubicaciones');
  }
  show(id) {
    return this.http.get(environment.base + 'ubicaciones/' + id, { headers : this.headers });
  }
  store(data) {
    return this.http.post(environment.base + 'ubicaciones', data, {
      headers : {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
  update(data, id) {
    return this.http.put(environment.base + 'ubicaciones/' + id, data, { headers : this.headers });
  }
  destroy(id) {
    return this.http.delete(environment.base + 'ubicaciones/' + id, { headers :  this.headers });
  }
  getImagenes(ubicacion_id) {
    return this.http.get(environment.base + 'ubicaciones/' + ubicacion_id + '/get-imagenes');
  }


}
