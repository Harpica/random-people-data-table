import { NextFunction, Request, Response } from 'express';
import { LinesNumbers } from '../utils/datasetsLinesRead';
import seedrandom from 'seedrandom';
import nthline from 'nthline';
import path from 'path';
import { ERR_TYPES, PHONE_CODES } from '../utils/constants';
import {
    addSymbol,
    deleteSymbol,
    randomNumber,
    swapSymbol,
} from '../utils/utils';

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
    const data = await getPeopleArray(
        random,
        linesNumbers,
        region,
        dataPath,
        errNumber
    );

    res.send(data);
};

async function getPeopleArray(
    random: seedrandom.PRNG,
    linesNumbers: LinesNumbers,
    region: string,
    dataPath: string,
    errNumber: number
) {
    let data: Array<Person> = [];
    for (let i = 0; i < 20; i++) {
        let person = await setPerson(random, linesNumbers, region, dataPath);
        person = setErrors(random, region, errNumber, person) as Person;
        data.push(person);
    }

    return data;
}

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
        const phoneRangeMin = 10 ** (PHONE_CODES[region].length - 1) - 1;
        const phoneRangeMax = 10 ** PHONE_CODES[region].length;

        return `${PHONE_CODES[region].code} ${randomNumber(
            random,
            phoneRangeMin,
            phoneRangeMax
        )}`;
    }
}

function getId(random: seedrandom.PRNG) {
    return Math.abs(random.int32());
}

function setErrors(
    random: seedrandom.PRNG,
    region: string,
    errNumber: number,
    data: { [key: string]: string }
) {
    let errCounter = errNumber;
    const fieldsKeys = Object.keys(data);

    while (errCounter > 0) {
        let isError: boolean = true;
        if (errNumber < 1) {
            isError = randomNumber(random) <= errNumber;
        }
        if (isError) {
            const fieldKey =
                fieldsKeys[randomNumber(random, 0, fieldsKeys.length)];
            const field = data[fieldKey];
            const errType = randomNumber(random, 0, ERR_TYPES._length);
            data[fieldKey] = makeError(random, region, field, errType);
            errCounter -= 1;
        }
    }
    return data as unknown;
}

function makeError(
    random: seedrandom.PRNG,
    region: string,
    string: string,
    type: ERR_TYPES
): string {
    const index = randomNumber(random, 0, string.length - 1);

    switch (type) {
        case ERR_TYPES.delete:
            return deleteSymbol(string, index);
        case ERR_TYPES.add:
            return addSymbol(random, region, string, index);
        case ERR_TYPES.swap:
            return swapSymbol(string, index);
        default:
            return string;
    }
}
