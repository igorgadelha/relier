import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(
    private auth: AuthService,
    public router: Router
  ) {
    this.auth
        .logout()
        .then(
          res => {
            this.router.navigate(['/login']);
            this.auth.authSubject.next(false);
          }
        );

  }

  ngOnInit() {
  }

}
