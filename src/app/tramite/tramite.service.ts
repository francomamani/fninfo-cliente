import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
@Injectable()
export class TramiteService {
    headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
    });
    constructor(private http: HttpClient) {
    }

    index() {
        return this.http.get(environment.base + 'tramites', {headers: this.headers});
    }
    show(id) {
        return this.http.get( environment.base + 'tramites/' + id);
    }
    store(data) {
        return this.http.request('post',  environment.base + 'tramites', {
            body: data,
            headers : this.headers

        });
    }
    update(data, id) {
        return this.http.put(environment.base + 'tramites/' + id, data, { headers: this.headers });
    }
    destroy(id) {
        return this.http.delete(environment.base + 'tramites/' + id, { headers: this.headers });
    }
    hasManyPasos(id) {
        return this.http.get(environment.base + 'tramites/' + id + '/pasos');
    }
    hasManyTramiteUbicacion(id) {
        return this.http.get(environment.base + 'tramites/' + id + '/ubicacion');
    }
}
