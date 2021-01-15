import {Cevap} from './cevap';
import {Observable} from 'rxjs';
import {Uye} from './uye';
import {Kategori} from './kategori';

export class Soru {
  id?: string;
  icerik: string;
  kullaniciId: string;
  kategoriId: string;
  begeniSayisi?: number;

  cevaplar?: Cevap[] | Observable<Cevap[]>;
  uye?: Uye;
  kategori?: Kategori;
}
