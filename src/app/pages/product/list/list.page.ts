import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../providers/product/product.service';
import { tap, map } from  'rxjs/operators';
// components
import { LoadingController } from '@ionic/angular';
import { Observable, BehaviorSubject, Subscription } from  'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  public products: any;
  public loading: any;
  constructor(
    public productCtrl: ProductService,
    public loadingCtrl: LoadingController
  ) {

    }

  ngOnInit() {
    this.presentLoading('Carregando Produtos...');
  }

  ionViewWillEnter () {
    this.productCtrl
        .list()
        .then( res => {
          console.log (res);
          this.products = res;
        },
        (error) => {
          console.log(error);
        });
  }

  async  presentLoading(message) {
     let loading;
         loading =  await this.loadingCtrl.create({
            message: message,
            duration: 2000
          });
    return await loading.present();
  }

  open() {

  }

  create() {

  }

}
