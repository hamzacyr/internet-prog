import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Begeni} from '../../modeller/begeni';
import {AuthService} from '../../servisler/auth.service';
import {Cevap} from '../../modeller/cevap';

@Component({
  selector: 'app-cevap-ekle',
  templateUrl: './cevap-ekle.component.html',
  styleUrls: ['./cevap-ekle.component.css']
})
export class CevapEkleComponent implements OnInit {
  cevap: string = '';
  @Input('soruId') soruId: string = '';

  cevaplarRef: AngularFireList<Cevap>;

  constructor(
    public db: AngularFireDatabase,
    public authServis: AuthService
  ) {
  }

  ngOnInit(): void {
    this.cevaplarRef = this.db.list<Cevap>('cevap');
  }

  CevapEkle() {
    if (!this.cevap) {
      return;
    }

    this.cevaplarRef.push({
      icerik: this.cevap,
      kullaniciId: this.authServis.kullanici.uid,
      soruId: this.soruId
    })

    this.cevap = ""
  }

  Begen() {
    this.db.list<Begeni>("begeni").push({
      kullaniciId: this.authServis.kullanici.uid,
      soruId: this.soruId
    })
  }
}
