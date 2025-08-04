const mzr = require('mzrdjs');
const path = require('path');
const fs = require('fs');

const jsonPath = path.join(__dirname, '..', 'output', 'data.json');

fs.readFile(jsonPath, 'utf8', (err, data) => {
    if (err) {
        console.error('JSON dosyası okunamadı:', err);

        return;
    };

    let kelimeVerisi;

    try {
        kelimeVerisi = JSON.parse(data);
    } catch (parseErr) {
        console.error('JSON parse hatası:', parseErr);

        return;
    }

    let toplam = 0;
    for (const uzunluk in kelimeVerisi) {
        toplam += kelimeVerisi[uzunluk].length;
    }

    console.log(`Toplam kelime sayısı: ${mzr.formatNumber(toplam)}`);
});
