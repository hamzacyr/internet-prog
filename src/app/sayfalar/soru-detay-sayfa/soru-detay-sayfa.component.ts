import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {Cevap} from '../../modeller/cevap';
import {Soru} from '../../modeller/soru';
import {AuthService} from '../../servisler/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-soru-detay-sayfa',
  templateUrl: './soru-detay-sayfa.component.html',
  styleUrls: ['./soru-detay-sayfa.component.css']
})
export class SoruDetaySayfaComponent implements OnInit {
  soruRef: AngularFireObject<Soru>;
  soru: Soru = new Soru();

  constructor(public authServis: AuthService, public db: AngularFireDatabase, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.soruRef = this.db.object<Soru>('soru/' + this.route.snapshot.paramMap.get('id'));
    this.soruRef.snapshotChanges().subscribe(change => {
      const soru: Soru = {id: change.key, ...change.payload.val()};

      this.db.list<Cevap>('cevap', ref => ref.orderByChild('soruId').equalTo(soru.id))
        .snapshotChanges()
        .subscribe(cevapChanges => {
          soru.cevaplar = cevapChanges.map(cevapC => {
            return {id: cevapC.key, ...cevapC.payload.val()};
          });
        });

      this.soru = soru
    });

  }

  CevabimiSil(cevapId: string) {
    if (confirm("Emin misiniz?")) {
      return this.db.object<Cevap>("cevap/" + cevapId).remove()
    }
  }

}
