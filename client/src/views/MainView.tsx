import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { MainVM } from '../viewModels/Main.VM';
import Table from '../components/Table';
import Form from '../components/Form';
import { api } from '../utils/API';

const MainView = observer(() => {
    const [vm] = useState(new MainVM(api));

    return (
        <div className='w-full flex justify-center bg-gradient-to-r from-sky-500 to-indigo-500'>
            <div className='h-screen w-full 2xl:max-w-screen-2xl flex flex-col items-center sm:p-7 gap-5 box-border'>
                <header>
                    <h1 className='font-bold text-3xl uppercase text-white'>
                        Random people data generator
                    </h1>
                </header>
                <main className=' grid grid-cols-1 grid-rows-[210px_500px] gap-5 box-border'>
                    <Form vm={vm} />
                    <Table vm={vm} />
                </main>
            </div>
        </div>
    );
});

export default MainView;
