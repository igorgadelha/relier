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
  public allProducts: any;
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
          this.allProducts = res;
          this.products = this.allProducts;
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

  filterProducts (ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.products = this.allProducts.filter((item) => {
        return item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.products = this.allProducts;
    }
  }

}
