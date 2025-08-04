# Türkçe Kelime Filtreleme ve Sınıflandırma Aracı
Bu proje, Türkçe kelimeleri uzunluklarına göre sınıflandırmak ve belirli filtreleme kurallarına göre geçerli olanları JSON formatında saklamak için geliştirilmiştir.

---

## Özellikler
- Türkçe kelimeleri uzunluklarına göre sınıflandırır.
- Belirli yapay, hatalı veya istenmeyen kelimeleri filtreler.
- Hunspell sözlüğü ile doğrulama yapar.
- Uzunluklara göre kelime sayısını formatlı şekilde gösterir.

## Çıktı Formatı
```json
{
  "2": ["ne", "ve", "ya", ...],
  "3": ["bir", "iki", "can", ...],
  ...
  "15": ["kapsamaktadır", "araştırmacılar", ...]
}
````

---

## Kullanılan Veri Setleri
* [Hunspell Türkçe Sözlük (`tr_TR.dic`)](https://github.com/LibreOffice/dictionaries/blob/master/tr_TR/tr_TR.dic)
  Kelimelerin doğruluğunu kontrol etmek amacıyla kullanılmıştır.
* [Türkçe Kelime Frekansı - HermitDave (2018)](https://github.com/hermitdave/FrequencyWords/blob/master/content/2018/tr/tr_full.txt)
  Türkçedeki yaygın kelimeler temel veri kaynağı olarak alınmıştır.
> **Not:** Veriler 2018 yılına aittir ve istatistiksel olarak güncelliği o döneme dayanır.

---

## Filtreleme Kuralları
* Sadece Türkçe harflerden oluşmalı.
* Aynı harfin 3 veya daha fazla tekrarından oluşmamalı (örneğin: `"aaaaa"`, `"heyyyy"` gibi kelimeler hariç tutulur).
* 15 karakterden uzun kelimeler yalnızca Hunspell sözlüğünde geçiyorsa ve belirli İngilizce kökenli desenleri içermiyorsa kabul edilir (`meth`, `ology`, `chlor`, `ph`, `tion`, `x`, `w`, `q` gibi).
* Minimum uzunluk: 2 karakter
  Maksimum uzunluk: 30 karakter

---

## Kurulum
```bash
git clone https://github.com/MZRCode/turkish-wordset.git
cd turkish-wordset
npm install
```

## Kullanım
### 1. JSON çıktısını üret
```bash
node index.js
```

### 2. Toplam kelime sayısını görmek için:
```bash
node tools/uzunlukHesapla.js
```

---

## Lisans
Bu proje MIT lisansı ile lisanslanmıştır. Detaylar için `LICENSE` dosyasını inceleyebilirsiniz.

## Katkıda Bulunmak
PR'ler ve katkılar memnuniyetle karşılanır. Herhangi bir hata, eksiklik veya öneri varsa bir issue oluşturabilir veya pull request gönderebilirsin.