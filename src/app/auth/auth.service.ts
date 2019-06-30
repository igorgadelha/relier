import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject, Subscription } from  'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Storage } from  '@ionic/storage';
import { User } from  './user';
import { AuthResponse } from  './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  server:  string  =  'http://api.testes.relier.com.br';
  authSubject  =  new  BehaviorSubject(false);

  constructor (
    private httpClient:  HttpClient,
    public jwtHelper: JwtHelperService,
    private storage: Storage
  ) {

  }

async login(user: User) {
  return await this.httpClient
              .post( this.server + '/autenticar', user )
              .toPromise();
 }


logout() {
   return this.storage.remove("ACCESS_TOKEN");
 }

setToken (token) {
   this.storage.set("ACCESS_TOKEN", token);
}

 async isLoggedIn() {
   let status: boolean;
    await this.storage
              .get('ACCESS_TOKEN')
              .then( t => {
                console.log ("JWT: ", this.jwtHelper.isTokenExpired(t));
                status =  !this.jwtHelper.isTokenExpired(t);
              });
    console.log ("Status: ", status);
    return await status;
    // Check whether the token is expired and return
  }

 async authToken() {
    let token;
    await this.storage.get('ACCESS_TOKEN').then( t => { token = t; });
    console.log (token);
    return await token;

  }

}
