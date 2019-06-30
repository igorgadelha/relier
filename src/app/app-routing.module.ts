import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
// guard
import { AuthGuard } from './guards/auth/auth.guard';

import { LogoutComponent } from './auth/logout/logout.component';
// forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren:  './pages/product/list/list.module#ListPageModule',
  },
  {
    path: 'login',
    loadChildren: './pages/auth/login/login.module#LoginPageModule'
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'product',
    canActivate: [AuthGuard],
    loadChildren: './pages/product/list/list.module#ListPageModule',
  },
  {
    path: 'product/create',
    canActivate: [AuthGuard],
    loadChildren: './pages/product/create/create.module#CreatePageModule',
  },
  {
    path: 'product/:id',
    canActivate: [AuthGuard],
    loadChildren: './pages/product/view/view.module#ViewPageModule',
   }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
