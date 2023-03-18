import nthline from 'nthline';
import * as fs from 'fs';
import path from 'path';

export type LinesNumbers = { [key: string]: { [key: string]: number } };

export const readDatasetsLinesNumber = async (datasetsPath: string) => {
    const listOgRegions: Array<string> = fs.readdirSync(datasetsPath);
    let linesNumbers: LinesNumbers = {};
    let promises: Array<Promise<void>> = [];
    listOgRegions.forEach((region) => {
        const datasetsNames = fs.readdirSync(path.join(datasetsPath, region));
        datasetsNames.forEach((set) => {
            const regionDataPath = path.join(
                datasetsPath + '/' + region + '/' + set
            );
            const appendLineNumber = (line: string) => {
                linesNumbers[region] = {
                    ...linesNumbers[region],
                    [set.replace('.txt', '')]: parseInt(line),
                };
            };
            const result = nthline(0, regionDataPath)
                .then(appendLineNumber)
                .catch((err) => console.log(err));
            promises.push(result);
        });
    });
    await Promise.all(promises).then(() => {
        console.log(linesNumbers);
    });
    return linesNumbers;
};
