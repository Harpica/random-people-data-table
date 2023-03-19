import { Api } from '../utils/API';
import { Person } from '../utils/types';
import { action, makeAutoObservable } from 'mobx';

export class MainVM {
    state: 'pending' | 'done' | 'error';
    data: Array<Person>;
    private api: Api;
    region: string;
    errNumber: number;
    seed: string;
    page: number;
    constructor(api: Api) {
        this.state = 'pending';
        this.data = [];
        this.api = api;
        this.region = 'US';
        this.errNumber = 0;
        this.seed = '0';
        this.page = 1;
        makeAutoObservable(this);
        this.getData(this.region, this.errNumber, this.seed, this.page);
    }

    private getData(
        region: string,
        errNumber: number,
        seed: string,
        page: number
    ) {
        this.state = 'pending';
        this.api
            .getData(region, errNumber, seed, page)
            .then(
                action('fetchSuccess', (data) => {
                    const newList = [...this.data];
                    data.data.forEach((line: Person) => {
                        newList.push(line);
                    });
                    this.data = newList;
                    this.state = 'done';
                })
            )
            .catch(
                action('fetchError', (error) => {
                    this.state = 'error';
                    console.log(error);
                })
            );
    }

    handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.data = [];
        this.getData(this.region, this.errNumber, this.seed, 1);
    }

    handleLoadNewPage() {
        this.page += 1;
        this.getData(this.region, this.errNumber, this.seed, this.page);
    }

    set setRegion(value: string) {
        this.region = value;
    }

    set setErrNumber(value: string) {
        if (value !== '') {
            this.errNumber = parseFloat(value);
            return;
        }
        this.errNumber = 0;
    }

    set setSeed(value: string) {
        this.seed = value;
    }

    generateSeed() {
        return Math.floor(Math.random() * 100 + 1).toString();
    }
}
