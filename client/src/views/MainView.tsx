import { useState } from 'react';
import { CSVLink } from 'react-csv';
import Table from '../components/Table';
import { api } from '../utils/API';
import { MainVM } from '../viewModels/Main.VM';
import { observer } from 'mobx-react-lite';

const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Address', key: 'address' },
    { label: 'Phone', key: 'phone' },
];

const MainView = observer(() => {
    const [vm] = useState(new MainVM(api));

    return (
        <div className='w-full flex justify-center bg-gradient-to-r from-sky-500 to-indigo-500'>
            <div className='h-screen w-full 2xl:max-w-screen-2xl flex flex-col items-center sm:p-7 gap-5 box-border'>
                <header>
                    <h1 className='font-bold text-3xl uppercase'>
                        Random people data generator
                    </h1>
                </header>
                <main className=' grid grid-cols-1 grid-rows-[210px_500px] gap-5 box-border'>
                    <form
                        className='flex flex-col justify-center gap-2 bg-white p-4 shadow-md rounded max-w-2xl m-auto'
                        onSubmit={(e) => {
                            vm.handleSubmitForm(e);
                        }}
                    >
                        <div className='flex justify-between'>
                            <label htmlFor='region'>Choose data region:</label>
                            <select
                                id='region'
                                name='region'
                                className='ml-3 bg-inherit border-b  border-indigo-500 outline-none hover:opacity-60'
                            >
                                <option value={'US'}>American</option>
                                <option value={'ES'}>Spanish</option>
                                <option value={'PL'}>Polish</option>
                            </select>
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor='errors-range'>
                                Choose number of errors per line:
                            </label>
                            <input
                                type='range'
                                id='errors-range'
                                name='errorsRange'
                                min={0}
                                max={10}
                                step={0.25}
                                className='range accent-indigo-500'
                            />
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor='errors-number'>
                                Or enter exact number not greater than 1000:
                            </label>
                            <input
                                id={'errors-number'}
                                type='number'
                                name='errors-number'
                                min={0}
                                max={1000}
                                className='ml-3 bg-inherit border-b  border-indigo-500 outline-none hover:opacity-60'
                            />
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor='seed'>
                                Enter seed for randomization:
                            </label>
                            <input
                                id={'seed'}
                                type={'text'}
                                className='ml-3 bg-inherit border-b  border-indigo-500 outline-none hover:opacity-60'
                            ></input>
                        </div>
                        <div className='flex justify-around mt-3'>
                            <button
                                type={'submit'}
                                className=' p-2 pr-8 pl-8 self-center bg-gradient-to-r from-sky-500 to-indigo-500
                                 text-white shadow-md rounded outline-none hover:opacity-80 transition-all active:scale-90'
                            >
                                Generate
                            </button>
                            <div className='rounded bg-gradient-to-r from-sky-500 to-indigo-500 p-1 hover:opacity-80 transition-all active:scale-90'>
                                <button
                                    type='button'
                                    className='w-32 box-border p-1 pr-8 pl-8 self-center bg-white text-indigo-500
                                     shadow-md rounded outline-none transition-all hover:opacity-80 '
                                >
                                    <CSVLink
                                        data={vm.data.slice()}
                                        headers={headers}
                                    >
                                        Export
                                    </CSVLink>
                                </button>
                            </div>
                        </div>
                    </form>
                    <Table vm={vm} />
                </main>
            </div>
        </div>
    );
});

export default MainView;
