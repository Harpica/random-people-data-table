import { MainVM } from '../viewModels/Main.VM';

export interface Person {
    number?: number;
    id: string;
    name: string;
    address: string;
    phone: string;
}

export interface MainViewChildProps {
    vm: MainVM;
}
