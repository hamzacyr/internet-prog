import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AuthService} from '../../servisler/auth.service';
import {Soru} from '../../modeller/soru';
import {Observable} from 'rxjs';
import {Kategori} from '../../modeller/kategori';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-soru-ekle',
  templateUrl: './soru-ekle.component.html',
  styleUrls: ['./soru-ekle.component.css']
})
export class SoruEkleComponent implements OnInit {
  soru: string = '';
  kategoriId: string = '';
  sorularRef: AngularFireList<Soru>;
  kategoriler: Observable<Kategori[]>;

  constructor(public db: AngularFireDatabase, public authServis: AuthService) {

  }

  ngOnInit(): void {
    this.sorularRef = this.db.list<Soru>('soru');
    this.kategoriler = this.db.list<Kategori>('kategori').snapshotChanges().pipe(map(changes => {
      return changes.map(c => {
        return {
          id: c.key,
          ...c.payload.val()
        };
      });
    }));
  }

  SoruYayinla() {
    if (!this.soru || !this.kategoriId) {
      return;
    }

    this.sorularRef.push({
      icerik: this.soru,
      kullaniciId: this.authServis.kullanici.uid,
      kategoriId: this.kategoriId,
    });

    this.soru = '';
  }

}
