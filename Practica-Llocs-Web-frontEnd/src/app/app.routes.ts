import { Routes } from '@angular/router';
import { IniciComponent } from './inici/inici.component';
import { MonedesComponent } from './monedes/monedes.component';
import { NewsComponent } from './news/news.component';
import { AccountComponent } from './account/account.component';
import { WalletComponent } from './wallet/wallet.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

export const routes: Routes = [
  {
    path:'',
    component: IniciComponent,
    title: 'Inici'
  },
  {
    path:'estadisticas',
    component: EstadisticasComponent,
    title: 'Estadística'
  },
  {
    path:'monedes',
    component: MonedesComponent,
    title: 'Monedes'
  },
  {
    path:'ultimesnoticies',
    component: NewsComponent,
    title: 'Últimes noticies'
  },
  {
    path:'compte',
    component: AccountComponent,
    title: 'Compte'
  },
  {
    path:'cartera',
    component: WalletComponent,
    title: 'Cartera'
  }
];
