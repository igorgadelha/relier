import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public auth: boolean ;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'basket',
      auth: true
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'person',
      auth: false
    },
    {
      title: 'Logout',
      url: '/logout',
      icon: 'exit',
      auth: true
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authCtrl: AuthService
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.authCtrl.authSubject.subscribe(bol => this.auth = bol);
    console.log (this.auth);

  }
}
