import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable()
export class PasoService {
    headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
    });

    constructor(private http: HttpClient) {
    }

    index() {
        return this.http.get(environment.base + 'pasos');
    }
    show(id) {
        return this.http.get( environment.base + 'pasos/' + id);
    }
    store(data) {
        return this.http.request('post',  environment.base + 'pasos', {
            body: data,
            headers : new HttpHeaders({
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            })
        });
    }
    update(data, id) {
        return this.http.request('put', environment.base + 'pasos/' + id, {
            body: data,
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
    destroy(id) {
        return this.http.delete(environment.base + 'pasos/' + id, { headers: this.headers });
    }
}
