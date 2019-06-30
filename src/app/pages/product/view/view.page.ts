import { Component, OnInit } from '@angular/core';
// alert
import { AlertController, ToastController } from '@ionic/angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../providers/product/product.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  public id;
  public data;
  public editForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productCtrl: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    public toastCtrl: ToastController
  ) {

  }

  ngOnInit() {
    // get the id
    this.id = this.route.snapshot.params.id;
    console.log (this.id);
    this.editForm = this.formBuilder.group({
      nome: new FormControl('', Validators.compose([
                                  Validators.required
                                ])
      ),
      categoria: new FormControl('', [Validators.required]),
      preco: new FormControl('', Validators.compose([
                                  Validators.required,
                                  Validators.minLength(1)
                                ])
      )
    });

    this.getData(this.id);
  }

  getData (id) {
    this.productCtrl.get(id)
    .then(data => {
      this.data =  data;
    });

  }

  public onSubmit() {
    console.log (this.editForm.value);
    this.editForm.value.id = this.id;
    this.productCtrl
        .update(this.editForm.value)
        .then(
          (res) => {
            this.presentToast('Produto atualizado com sucesso!');
          },
          (error) => {
            this.presentToast('Não foi possível atualizar o produto.');
          }
        );
  }

  public delete() {
    this.productCtrl
        .delete(this.id)
        .then(
          (res) => {
            this.presentToast('Produto removido com sucesso!');
            this.router.navigate(["/product"]);
          },
          (error) => {
            this.presentToast('Não foi possível remover o produto.');
          }
        );
  }



  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Cuidado!',
      message: 'Você realmente deseja remover este item dos seus produtos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Remover',
          handler: () => {
            console.log('Confirm Okay');
            this.delete();
          }
        }
      ]
    });

    await alert.present();
  }
  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      position:'top',
      duration: 2000
    });
    toast.present();
  }
}
