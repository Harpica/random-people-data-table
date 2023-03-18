import seedrandom from 'seedrandom';

export const randomNumber = (
    random: seedrandom.PRNG,
    min: number,
    max: number
) => {
    return Math.floor(random() * (max - min) + min);
};
