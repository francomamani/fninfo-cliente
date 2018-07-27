import { Component } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {RoutingStateService} from './routing-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ol: any;
  constructor(
              public authService: AuthService,
              private router: Router) {  }

  logout() {
    this.authService.logout()
        .subscribe((res: any) => {
          if (res.deslogueo) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.router.navigate(['/']);
          }
        }, (error: any) => {
            console.log(error.error.mensaje);
        });
  }
}