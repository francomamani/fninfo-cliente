import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment} from '../../environments/environment.prod';
@Injectable()
export class UserService{
    headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
    });
    constructor(private http: HttpClient) {}

    index() {
        return this.http.get( environment.base + 'users');
    }

    show(id) {
        return this.http.get(environment.base + 'users/' + id);
    }

    store(form) {
      return this.http.post(environment.base + 'register', form, { headers: this.headers});
    }

    update(form, id) {
        return this.http.put( environment.base + 'users/' + id, form, { headers: this.headers });
    }
    destroy(id) {
        return this.http.delete( environment.base + 'users/' + id, { headers: this.headers });
    }
}
