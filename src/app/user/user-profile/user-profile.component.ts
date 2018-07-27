import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any = null;
  constructor(private authService: AuthService) {
    this.user = this.authService.me();
  }

  ngOnInit() {
  }

}
