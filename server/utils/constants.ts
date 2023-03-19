export const PHONE_CODES: { [key: string]: { code: string; length: number } } =
    {
        PL: { code: '+48', length: 9 },
        US: { code: '+1', length: 10 },
        ES: { code: '+34', length: 9 },
    };

export enum ERR_TYPES {
    delete = 0,
    add = 1,
    swap = 2,
    _length = 3,
}

const LATIN_ALPHABET = getLatinAlphabet();

function getLatinAlphabet() {
    let array = [' '];
    for (let i = 65; i <= 90; i++) {
        array.push(String.fromCharCode(i));
    }
    for (let i = 97; i <= 122; i++) {
        array.push(String.fromCharCode(i));
    }
    return array;
}

export const ALPHABETS: { [key: string]: Array<string> } = {
    PL: [
        'Ą',
        'Ć',
        'Ę',
        'Ł',
        'Ń',
        'Ó',
        'Ś',
        'Ź',
        'Ż',
        'ą',
        'ć',
        'ę',
        'ł',
        'ń',
        'ó',
        'ś',
        'ź',
        'ż',
    ].concat(LATIN_ALPHABET),
    US: LATIN_ALPHABET,
    ES: LATIN_ALPHABET,
};
