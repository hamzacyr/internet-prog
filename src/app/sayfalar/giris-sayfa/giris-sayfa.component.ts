import { Component, OnInit } from '@angular/core';
import {Sonuc} from '../../modeller/sonuc';
import {AuthService} from '../../servisler/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-giris-sayfa',
  templateUrl: './giris-sayfa.component.html',
  styleUrls: ['./giris-sayfa.component.css']
})
export class GirisSayfaComponent implements OnInit {
  eposta: string = ""
  sifre: string = ""
  sonuc: Sonuc = new Sonuc();

  constructor(public authServis: AuthService, public router: Router) { }

  ngOnInit(): void {

  }

  GirisYap() {
    this.authServis.GirisYap(this.eposta, this.sifre).then(
      () => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Giriş Başarılı"
        this.router.navigate(["kesfet"])
      },
    ).catch(
      err => {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Şifre yada Eposta yanlış"
      }
    )
  }
}
