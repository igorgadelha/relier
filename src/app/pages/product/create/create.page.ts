import { Component, OnInit } from '@angular/core';
// alert
import { AlertController, ToastController } from '@ionic/angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../providers/product/product.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public createForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productCtrl: ProductService,
    public alertController: AlertController,
    public toastCtrl: ToastController,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
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

    console.log (this.createForm);
  }

  public onSubmit() {
    console.log (this.createForm.value);
    this.productCtrl
        .create(this.createForm.value)
        .then(
          (res) => {
            this.presentToast('Produto inserido com sucesso!');
            this.router.navigate(["/product"]);
          },
          (error) => {
            this.presentToast('Não foi possível inserir o produto.');
          }
        );
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
