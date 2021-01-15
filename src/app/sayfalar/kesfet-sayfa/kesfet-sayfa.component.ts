import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Kategori} from '../../modeller/kategori';
import {Soru} from '../../modeller/soru';
import {map} from 'rxjs/operators';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AuthService} from '../../servisler/auth.service';
import {Cevap} from '../../modeller/cevap';
import {Begeni} from '../../modeller/begeni';
import {Uye} from '../../modeller/uye';

@Component({
  selector: 'app-kesfet-sayfa',
  templateUrl: './kesfet-sayfa.component.html',
  styleUrls: ['./kesfet-sayfa.component.css']
})
export class KesfetSayfaComponent implements OnInit {
  sorular: Observable<Soru[]>;
  sorularRef: AngularFireList<Soru>;

  constructor(
    public db: AngularFireDatabase,
    public authServis: AuthService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.sorularRef = this.db.list<Soru>('soru');

    this.sorular = this.sorularRef.snapshotChanges().pipe(
      map(
        changes => {
          return changes.map(c => {
            const soru: Soru = {id: c.key, ...c.payload.val()};

            this.db.list<Cevap>('cevap', ref => ref.orderByChild('soruId').equalTo(soru.id).limitToFirst(5))
              .snapshotChanges()
              .subscribe(cevapChanges => {
                soru.cevaplar = cevapChanges.map(cevapC => {

                  const cevap: Partial<Cevap> = {
                    id: cevapC.key,
                    ...cevapC.payload.val()
                  };

                  this.db.list<Uye>('uye', ref => ref.orderByChild('kullaniciId').equalTo(cevapC.payload.val().kullaniciId))
                    .snapshotChanges()
                    .subscribe(uyeChanges => {
                      cevap.uye = {id: uyeChanges[0].key, ...uyeChanges[0].payload.val()};
                    });

                  return cevap as Cevap;
                });
              });

            this.db.list<Begeni>('begeni', ref => ref.orderByChild('soruId').equalTo(soru.id))
              .snapshotChanges()
              .subscribe(cevapChanges => {
                soru.begeniSayisi = cevapChanges.length;
              });

            this.db.list<Uye>('uye', ref => ref.orderByChild('kullaniciId').equalTo(soru.kullaniciId))
              .snapshotChanges()
              .subscribe(uyeChanges => {
                soru.uye = {
                  id: uyeChanges[0].key,
                  ...uyeChanges[0].payload.val()
                };
              });

            this.db.list<Kategori>('kategori', ref => ref.orderByKey().equalTo(soru.kategoriId))
              .snapshotChanges()
              .subscribe(kategoriChanges => {
                soru.kategori = {
                  id: kategoriChanges[0].key,
                  ...kategoriChanges[0].payload.val()
                };
              });

            return soru;
          });
        }
      )
    );
  }

  CevabimiSil(cevapId: string) {
    if (confirm('Emin misiniz?')) {
      return this.db.object<Cevap>('cevap/' + cevapId).remove();
    }
  }

}
