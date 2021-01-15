import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {Uye} from '../modeller/uye';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  girisKontrol: boolean = false;
  kullanici: firebase.User;

  constructor(
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
  ) {
    this.auth.onAuthStateChanged(kullanici => {
      this.girisKontrol = !!kullanici;
      this.kullanici = kullanici;
    });
  }

  ngOnInit() {
  }

  GirisYap(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  KayitOl(isim: string, soyisim: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(kullanici => {
      kullanici.user.updateProfile({displayName: isim + ' ' + soyisim}).then(() => {
        return this.db.list<Uye>('uye').push({
          adi: isim,
          soyadi: soyisim,
          rol: 'kullanici',
          kullaniciId: kullanici.user.uid
        });
      });
    });
  }

  CikisYap() {
    return this.auth.signOut();
  }
}
