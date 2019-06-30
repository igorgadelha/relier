import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { AuthResponse } from '../../../auth/auth-response';
// form and validations
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// router
import { Router } from '@angular/router';
// alert
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private authCtrl: AuthService,
    private formBuilder: FormBuilder,
    public router: Router,
    public toastCtrl: ToastController
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
                                  Validators.required,
                                  Validators.email
                                ])
      ),
      senha: new FormControl('', [Validators.required])
    });
    console.log (this.loginForm);
  }

   onSubmit() {
    console.log (this.loginForm.value);
    this.authCtrl
        .login( this.loginForm.value )
        .then(
          (success: AuthResponse) => {
            console.log (success.token);
            this.authCtrl.setToken(success.token);
            this.checkAuth();
          },
          error => {
            console.log(error);
            this.presentToast('Não foi possível realizar login!');
          },
        );
  }

  checkAuth() {
    this.authCtrl
        .isLoggedIn()
        .then(
          success => {
            this.presentToast('Login realizado com sucesso!');
            this.authCtrl.authSubject.next(true);
            this.router.navigate(["product"]);
          },
          error => {
            console.log(error);
            this.presentToast('Não foi possível realizar login!');
          },
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
