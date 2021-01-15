import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../servisler/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profilim-sayfa',
  templateUrl: './profilim-sayfa.component.html',
  styleUrls: ['./profilim-sayfa.component.css']
})
export class ProfilimSayfaComponent implements OnInit {
  isim: string = '';
  soyisim: string = '';
  eposta: string = '';

  simdikiSifre: string = "";
  yeniSifre: string = "";

  constructor(public authServis: AuthService, public router: Router) {
  }

  ngOnInit(): void {
    const isimDizi = this.authServis.kullanici.displayName.split(' ');
    this.isim = isimDizi.slice(0, isimDizi.length - 1).join(' ');
    this.soyisim = isimDizi[isimDizi.length - 1];
    this.eposta = this.authServis.kullanici.email;
  }

  Kaydet() {
    if (!this.isim || !this.soyisim || !this.eposta) return

    this.authServis.kullanici.updateProfile({displayName: this.isim + " " + this.soyisim})
  }

  SifreDegistir() {
    if (!this.yeniSifre || !this.simdikiSifre) return

    this.authServis.GirisYap(this.authServis.kullanici.email, this.simdikiSifre).then(() => {
      return this.authServis.kullanici.updatePassword(this.yeniSifre)
    })
  }

  EpostaDegistir() {
    if (!this.eposta) return

    return this.authServis.kullanici.updateEmail(this.eposta)
  }
}
