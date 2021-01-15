import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {redirectUnauthorizedTo, redirectLoggedInTo, canActivate} from '@angular/fire/auth-guard';
import {KesfetSayfaComponent} from './sayfalar/kesfet-sayfa/kesfet-sayfa.component';
import {ProfilimSayfaComponent} from './sayfalar/profilim-sayfa/profilim-sayfa.component';
import {SorularimSayfaComponent} from './sayfalar/sorularim-sayfa/sorularim-sayfa.component';
import {GirisSayfaComponent} from './sayfalar/giris-sayfa/giris-sayfa.component';
import {KayitSayfaComponent} from './sayfalar/kayit-sayfa/kayit-sayfa.component';
import {SoruDetaySayfaComponent} from './sayfalar/soru-detay-sayfa/soru-detay-sayfa.component';
import {SoruDuzenleSayfaComponent} from './sayfalar/soru-duzenle-sayfa/soru-duzenle-sayfa.component';
import {AdminSayfaComponent} from './sayfalar/admin-sayfa/admin-sayfa.component';

const girisYapmamisIseGirisYapaGonder = () => redirectUnauthorizedTo(['giris']);
const girisYapmisIseKesfeteGonder = () => redirectLoggedInTo(['kesfet']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'kesfet',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminSayfaComponent,
    ...canActivate(girisYapmamisIseGirisYapaGonder)
  },
  {
    path: 'kesfet',
    component: KesfetSayfaComponent,
  },
  {
    path: 'kesfet/:id',
    component: SoruDetaySayfaComponent
  },
  {
    path: 'kesfet/:id/duzenle',
    component: SoruDuzenleSayfaComponent,
    ...canActivate(girisYapmamisIseGirisYapaGonder)
  },
  {
    path: 'profilim',
    component: ProfilimSayfaComponent,
    ...canActivate(girisYapmamisIseGirisYapaGonder)
  },
  {
    path: 'sorularim',
    component: SorularimSayfaComponent,
    ...canActivate(girisYapmamisIseGirisYapaGonder)
  },
  {
    path: 'giris',
    component: GirisSayfaComponent,
    ...canActivate(girisYapmisIseKesfeteGonder)
  },
  {
    path: 'kayit',
    component: KayitSayfaComponent,
    ...canActivate(girisYapmisIseKesfeteGonder)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
