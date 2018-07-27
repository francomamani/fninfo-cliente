import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
@Injectable()
export class CategoriaService {
    headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
    });
    constructor(private http: HttpClient) {
    }
    index() {
        return this.http.get(environment.base + 'categorias', {headers: this.headers});
    }
    show(id) {
        return this.http.get( environment.base + 'categorias/' + id);
    }
    store(data) {
        return this.http.request('post',  environment.base + 'categorias', {
            body: data,
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }

        });
    }
    update(data, id) {
        return this.http.put(environment.base + 'categorias/' + id, data, { headers: this.headers });
    }
    destroy(id) {
        return this.http.delete(environment.base + 'categorias/' + id, { headers: this.headers });
    }
    hasManyNotificaciones(categoria_id) {
        return this.http.get(environment.base + 'categorias/' + categoria_id + '/notificaciones');
    }
}