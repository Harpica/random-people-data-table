import seedrandom from 'seedrandom';
import { ALPHABETS } from './constants';

export const randomNumber = (
    random: seedrandom.PRNG,
    min: number = 0,
    max: number = 1
) => {
    return Math.floor(random() * (max - min) + min);
};

export function deleteSymbol(string: string, index: number) {
    return string.slice(0, index) + string.slice(index + 1);
}

export function addSymbol(
    random: seedrandom.PRNG,
    region: string,
    string: string,
    index: number
) {
    const symbolIndex = randomNumber(random, 0, ALPHABETS[region].length - 1);
    const symbol = ALPHABETS[region][symbolIndex];
    return string.slice(0, index) + symbol + string.slice(index);
}

export function swapSymbol(string: string, index: number) {
    return (
        string.slice(0, index) +
        string.charAt(index + 1) +
        string.charAt(index) +
        string.slice(index + 2)
    );
}
