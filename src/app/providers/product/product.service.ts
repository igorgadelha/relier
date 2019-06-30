import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { tap, map } from  'rxjs/operators';
import { Observable, BehaviorSubject, Subscription } from  'rxjs';

import { AuthService } from '../../auth/auth.service';
import { Product } from '../../interfaces/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  server:  string  =  'http://api.testes.relier.com.br';
  public products: [] = [];
  constructor (
    private httpClient:  HttpClient,
    public auth: AuthService,

  ) {

  }

  getToken() {

  }

  async list() {
    try {
      let token;
      let data;
      await this.auth.authToken().then( t => { token = t; });

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'text/json',
          'Authorization': 'Bearer ' + token
        })
      };

      let response = await this.httpClient
        .get( this.server + '/produto/listar-produtos', httpOptions )
        .toPromise();

      return response;
    } catch (error) {
      console.log(error);
    }

  }

  async get(id) {
    try {
      let token;
      await this.auth.authToken().then( t => { token = t; });

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'text/json',
          'Authorization': 'Bearer ' + token
        })
      };

      let response = await this.httpClient
        .get( this.server + '/produto/recuperar/'+ id, httpOptions )
        .toPromise();

      return response;
    } catch (error) {
      console.log(error);
    }

  }

  async create( data: Product ) {
    try {
      let token;

      await this.auth.authToken().then( t => { token = t; });

      console.log ( data );

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + token
        })
      };
      let response = await this.httpClient
          .post(
            this.server + '/produto/cadastrar',
            data,
            httpOptions
          )
          .toPromise();

      return response;
    } catch (error) {
      console.log(error);
    }

  }

  async update(data) {
    try {
      let token;

      await this.auth.authToken().then( t => { token = t; });

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + token
        })
      };

      let response = await this.httpClient
          .put(
            this.server + '/produto/atualizar',
            data,
            httpOptions
          )
          .toPromise();

      return response;
    } catch (error) {
      console.log(error);
    }

  }

  async delete(id) {
    try {
      let token;

      await this.auth.authToken().then( t => { token = t; });
      console.log (token);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + token
        })
      };

      let response = await this.httpClient
          .delete(
            this.server + '/produto/remover?id=' + id,
            httpOptions
          )
          .toPromise();

      return response;
    } catch (error) {
      console.log(error);
    }

  }
}
