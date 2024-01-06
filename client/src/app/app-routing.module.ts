import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';

const routes: Routes = [
  {path:'', component: HomeComponent, data:{breadcrumb: 'Home'}},
  {path:'store', loadChildren:()=>import('./store/store.module').then(m=>m.StoreModule), data:{breadcrumb: 'Store'}},
  {path:'basket', loadChildren:()=>import('./basket/basket.module').then(m=>m.BasketModule), data:{breadcrumb: 'Basket'}},
  {path:'account', loadChildren:()=>import('./account/account.module').then(m=>m.AccountModule), data:{breadcrumb: 'Account'}},
  {path:'not-found', component: NotFoundComponent},
  {path:'server-error', component: ServerErrorComponent},
  {path:'**', redirectTo: '', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
