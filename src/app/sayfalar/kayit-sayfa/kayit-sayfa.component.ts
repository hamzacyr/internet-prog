import {Component, OnInit} from '@angular/core';
import {Sonuc} from '../../modeller/sonuc';
import {Router} from '@angular/router';
import {AuthService} from '../../servisler/auth.service';

@Component({
  selector: 'app-kayit-sayfa',
  templateUrl: './kayit-sayfa.component.html',
  styleUrls: ['./kayit-sayfa.component.css']
})
export class KayitSayfaComponent implements OnInit {
  isim: string = '';
  soyisim: string = '';
  eposta: string = '';
  sifre: string = '';
  sonuc: Sonuc = new Sonuc();

  constructor(public authServis: AuthService, public router: Router) {

  }

  ngOnInit(): void {

  }

  KayitOl() {
    return this.authServis.KayitOl(this.isim, this.soyisim, this.eposta, this.sifre).then(
      () => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = 'Kayıt yapıldı';
        this.router.navigate(['kesfet']);
      }
    ).catch(
      err => {
        this.sonuc.islem = false;
        this.sonuc.mesaj = 'Böyle bir kullanıcı zaten mevcut';
      }
    );
  }

}
