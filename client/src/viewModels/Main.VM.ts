import { Api } from '../utils/API';
import { Person } from '../utils/types';
import { action, makeAutoObservable } from 'mobx';

export class MainVM {
    state: 'pending' | 'done' | 'error';
    data: Array<Person>;
    // private setData: React.Dispatch<React.SetStateAction<Person[]>>;
    private api: Api;
    region: string;
    errNumber: number;
    seed: string;
    page: number;
    constructor(
        // data: Array<Person>,
        // setData: React.Dispatch<React.SetStateAction<Person[]>>,
        api: Api
    ) {
        this.state = 'pending';
        this.data = [];
        this.api = api;
        this.region = 'US';
        this.errNumber = 0;
        this.seed = '';
        this.page = 1;
        makeAutoObservable(this);
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
                    const newList = this.data;
                    data.data.forEach((line: Person) => {
                        newList.push(line);
                    });
                    this.data = newList;
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
        const region = (
            e.currentTarget.elements.namedItem('region') as HTMLInputElement
        ).value;
        const errNumber = parseInt(
            (
                e.currentTarget.elements.namedItem(
                    'errors-number'
                ) as HTMLInputElement
            ).value
        );
        const seed = (
            e.currentTarget.elements.namedItem('seed') as HTMLInputElement
        ).value;
        this.setQueryData(region, errNumber, seed, 1);
        console.log(this.region);
        this.getData(region, errNumber, seed, 1);
    }
    private setQueryData(
        region: string,
        errNumber: number,
        seed: string,
        page: number
    ) {
        this.region = region;
        this.errNumber = errNumber;
        this.seed = seed;
        this.page = page;
    }
    handleLoadNewPage() {
        console.log(this.region);
        this.page += 1;
        console.log(this.page);
        this.getData(this.region, this.errNumber, this.seed, this.page);
    }
}
