const path = require('path');
const fs = require('fs');

const wordFilePath = path.join(__dirname, 'data', 'kelimeler.txt');
const outputFilePath = path.join(__dirname, 'output', 'data.json');
const dictFilePath = path.join(__dirname, 'data', 'tr.dic');

function parseHunspellDict(data) {
    const lines = data.trim().split('\n');
    lines.shift();

    return new Set(
        lines.map(line => line.split('/')[0].toLowerCase().normalize('NFC'))
    );
}

function isValidWord(word, dictionarySet) {
    const yasakDesenler = /(meth|scope|ology|graphy|gastro|ph|tion|chlor|x|w|q)/i;
    const harfRegex = /^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$/;
    const tekrarRegex = /(.)\1{2,}/;

    const len = word.length;

    if (!harfRegex.test(word)) return false;
    if (tekrarRegex.test(word)) return false;

    if (len > 15) {
        if (!dictionarySet.has(word)) return false;
        if (yasakDesenler.test(word)) return false;
    };

    return len >= 2 && len <= 30;
}

fs.readFile(dictFilePath, 'utf8', (err, dictData) => {
    if (err) {
        console.error('Sözlük dosyası okunamadı:', err);

        return;
    };

    const dictionarySet = parseHunspellDict(dictData);

    fs.readFile(wordFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Kelime dosyası okunamadı:', err);

            return;
        };

        const result = {};
        const lines = data.trim().split('\n');

        for (const line of lines) {
            const [rawWord] = line.trim().split(/\s+/);
            if (!rawWord) continue;

            const word = rawWord.toLowerCase().normalize('NFC');
            if (!isValidWord(word, dictionarySet)) continue;

            const len = word.length.toString();
            if (!result[len]) result[len] = [];

            result[len].push(word);
        }

        fs.writeFile(outputFilePath, JSON.stringify(result, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('JSON yazılamadı:', err);

                return;
            };

            console.log(`Kelimeler 'output/${path.basename(outputFilePath)}' dosyasına yazıldı.`);
        });
    });
});
