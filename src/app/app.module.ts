import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KesfetSayfaComponent } from './sayfalar/kesfet-sayfa/kesfet-sayfa.component';
import { ProfilimSayfaComponent } from './sayfalar/profilim-sayfa/profilim-sayfa.component';
import { SorularimSayfaComponent } from './sayfalar/sorularim-sayfa/sorularim-sayfa.component';
import { GirisSayfaComponent } from './sayfalar/giris-sayfa/giris-sayfa.component';
import { KayitSayfaComponent } from './sayfalar/kayit-sayfa/kayit-sayfa.component';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { SoruEkleComponent } from './componentler/soru-ekle/soru-ekle.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { CevapEkleComponent } from './componentler/cevap-ekle/cevap-ekle.component';
import { SoruDetaySayfaComponent } from './sayfalar/soru-detay-sayfa/soru-detay-sayfa.component';
import { SoruDuzenleSayfaComponent } from './sayfalar/soru-duzenle-sayfa/soru-duzenle-sayfa.component';
import { AdminSayfaComponent } from './sayfalar/admin-sayfa/admin-sayfa.component';

@NgModule({
  declarations: [
    AppComponent,
    KesfetSayfaComponent,
    ProfilimSayfaComponent,
    SorularimSayfaComponent,
    GirisSayfaComponent,
    KayitSayfaComponent,
    SoruEkleComponent,
    CevapEkleComponent,
    SoruDetaySayfaComponent,
    SoruDuzenleSayfaComponent,
    AdminSayfaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
