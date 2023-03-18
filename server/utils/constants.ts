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

// 0 as ERR_TYPES
