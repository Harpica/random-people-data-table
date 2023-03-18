import { NextFunction, Request, Response } from 'express';
import { LinesNumbers } from '../utils/datasetsLinesRead';
import seedrandom from 'seedrandom';
import nthline from 'nthline';
import path from 'path';
import { ERR_TYPES, PHONE_CODES } from '../utils/constants';
import { randomNumber } from '../utils/utils';

interface Person {
    id: string;
    name: string;
    address: string;
    phone: string;
}

export const getData = async (
    req: Request,
    res: Response,
    _next: NextFunction,
    linesNumbers: LinesNumbers,
    dataPath: string
) => {
    const { errNumber, seed, page } = req.body.data as {
        errNumber: number;
        seed: string;
        page: number;
    };
    const region = req.params.region;
    const seedWithPage = seed + page;
    const random = seedrandom(seedWithPage);
    let data: Array<Person> = [];
    for (let i = 0; i < 20; i++) {
        const person = await setPerson(random, linesNumbers, region, dataPath);
        console.log(person);
        data.push(person);
    }
    res.send(data);
};

async function setPerson(
    random: seedrandom.PRNG,
    linesNumbers: LinesNumbers,
    region: string,
    dataPath: string
) {
    const id = getId(random).toString();
    const data = await getNameAndAddress(
        random,
        linesNumbers,
        region,
        dataPath
    );
    const name = data?.name ?? 'Default name';
    const address = data?.address ?? 'Default address';
    const phone = getPhoneNumber(random, region) ?? '+Default number';

    return { id, name, address: address, phone };
}

async function getNameAndAddress(
    random: seedrandom.PRNG,
    linesNumbers: LinesNumbers,
    region: string,
    dataPath: string
) {
    function getRandomLine(name: string) {
        return randomNumber(random, 1, linesNumbers[region][name]);
    }

    const firstNameLine = getRandomLine('names');
    const lastNameLine = getRandomLine('surnames');
    const addressLine = getRandomLine('addresses');

    const basePath = dataPath + '/' + region + '/';

    try {
        const firstName = await nthline(
            firstNameLine,
            path.join(basePath + 'names.txt')
        );
        const lastName = await nthline(
            lastNameLine,
            path.join(basePath + 'surnames.txt')
        );
        const address = await nthline(
            addressLine,
            path.join(basePath + 'addresses.txt')
        );
        return { name: firstName + ' ' + lastName, address: address };
    } catch (err) {
        console.log(err);
    }
}

function getPhoneNumber(random: seedrandom.PRNG, region: string) {
    if (PHONE_CODES[region]) {
        const phoneRange = 10 ** PHONE_CODES[region].length;
        return `${PHONE_CODES[region].code} ${randomNumber(
            random,
            0,
            phoneRange
        )}`;
    }
}

function getId(random: seedrandom.PRNG) {
    return Math.abs(random.int32());
}

function setErrors(
    random: seedrandom.PRNG,
    errNumber: number,
    data: { [key: string]: string }
) {
    let errCounter = errNumber;
    const fieldsKeys = Object.keys(data);
    while (errCounter > 0) {
        const fieldKey =
            fieldsKeys[randomNumber(random, 0, fieldsKeys.length - 1)];
        const field = data[fieldKey];
        const errType = randomNumber(random, 0, ERR_TYPES._length - 1);
    }
}

function makeError(string: string, type: ERR_TYPES) {
    switch (type) {
        case ERR_TYPES.delete:
            break;
        case ERR_TYPES.add:
            break;
        case ERR_TYPES.swap:
            break;

        default:
            break;
    }
}
