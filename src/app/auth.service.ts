import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment.prod';

@Injectable()
export class AuthService {

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    constructor(private http: HttpClient) {
    }

    login(form) {
        return this.http.post(environment.base + 'login', form);
    }

    me() {
        return JSON.parse(localStorage.getItem('user'));
    }

    register(form) {
        return this.http.post(environment.base + 'register', form);
    }

    logout() {
        return this.http.get(environment.base + 'logout', {headers: this.headers});
    }

    isAuthenticated() {
        return localStorage.getItem('token') !== null ? true : false;
    }

    changePassword(form, id) {
        return this.http.post(environment.base + 'change-password/' + id, form);
    }

    resetPassword(id) {
        return this.http.get(environment.base + 'reset-password/' + id);
    }
}
