import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {Soru} from '../../modeller/soru';
import {AuthService} from '../../servisler/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Kategori} from '../../modeller/kategori';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-soru-duzenle-sayfa',
  templateUrl: './soru-duzenle-sayfa.component.html',
  styleUrls: ['./soru-duzenle-sayfa.component.css']
})
export class SoruDuzenleSayfaComponent implements OnInit {
  soruRef: AngularFireObject<Soru>;
  soru: Soru = new Soru();
  icerik: string = '';
  kategoriId: string = '';
  kategoriler: Observable<Kategori[]>;

  constructor(public authServis: AuthService, public db: AngularFireDatabase, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.soruRef = this.db.object<Soru>('soru/' + this.route.snapshot.paramMap.get('id'));
    this.soruRef.snapshotChanges().subscribe(change => {
      this.soru = {id: change.key, ...change.payload.val()};
      this.icerik = this.soru.icerik;
      this.kategoriId = this.soru.kategoriId;
    });
    this.kategoriler = this.db.list<Kategori>('kategori').snapshotChanges().pipe(map(changes => {
      return changes.map(c => {
        return {
          id: c.key,
          ...c.payload.val()
        };
      });
    }));
  }

  SoruDuzenle() {
    if (!this.icerik || !this.kategoriId) {
      return;
    }

    this.soruRef.update({icerik: this.icerik, kategoriId: this.kategoriId})
      .then(() => {
        this.router.navigate(['kesfet', this.soru.id]);
      });
  }

}
