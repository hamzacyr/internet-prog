import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Soru} from '../../modeller/soru';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AuthService} from '../../servisler/auth.service';
import {map} from 'rxjs/operators';
import {Cevap} from '../../modeller/cevap';
import {Router} from '@angular/router';
import {Uye} from '../../modeller/uye';

@Component({
  selector: 'app-sorularim-sayfa',
  templateUrl: './sorularim-sayfa.component.html',
  styleUrls: ['./sorularim-sayfa.component.css']
})
export class SorularimSayfaComponent implements OnInit {

  sorularim: Observable<Soru[]>;
  sorularimRef: AngularFireList<Soru>;

  constructor(public db: AngularFireDatabase, public authServis: AuthService, public router: Router) {
  }

  ngOnInit(): void {
    this.sorularimRef = this.db.list<Soru>('soru', ref => ref.orderByChild('kullaniciId').equalTo(this.authServis.kullanici.uid));

    this.sorularim = this.sorularimRef.snapshotChanges().pipe(
      map(
        changes => {
          return changes.map(c => {
            const soru: Soru = {...c.payload.val(), id: c.key,};

            this.db.list<Cevap>('cevap', ref => ref.orderByChild('soruId').equalTo(soru.id).limitToFirst(5))
              .snapshotChanges()
              .subscribe(cevapChanges => {
                soru.cevaplar = cevapChanges.map(cevapC => {
                  const cevap: Partial<Cevap> = {...cevapC.payload.val(), id: cevapC.key,};

                  this.db.list<Uye>('uye', ref => ref.orderByChild('kullaniciId').equalTo(cevapC.payload.val().kullaniciId))
                    .snapshotChanges()
                    .subscribe(uyeChanges => {
                      cevap.uye = {id: uyeChanges[0].key, ...uyeChanges[0].payload.val()};
                    });

                  return cevap as Cevap;
                });
              });

            this.db.list<Uye>('uye', ref => ref.orderByChild('kullaniciId').equalTo(soru.kullaniciId))
              .snapshotChanges()
              .subscribe(uyeChanges => {
                soru.uye = {
                  id: uyeChanges[0].key,
                  ...uyeChanges[0].payload.val()
                };
              });

            return soru;
          });
        }
      )
    );
  }

  SorumuSil(soruId: string) {
    if (confirm('Emin misiniz?')) {
      this.sorularimRef.remove(soruId).then(() => {
        return this.db.list<Cevap>('cevap', ref => ref.orderByChild('soruId').equalTo(soruId))
          .snapshotChanges()
          .subscribe(changes => {
            changes.forEach(c => {
              return this.db.object<Cevap>('cevap/' + c.key).remove();
            });
          });
      });
    }
  }

  CevabiSil(cevapId: string) {
    if (confirm('Emin misiniz?')) {
      return this.db.object<Cevap>('cevap/' + cevapId).remove();
    }
  }

}
