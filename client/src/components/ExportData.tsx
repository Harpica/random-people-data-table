import { observer } from 'mobx-react-lite';
import { CSVLink } from 'react-csv';
import { MainViewChildProps } from '../utils/types';

const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Address', key: 'address' },
    { label: 'Phone', key: 'phone' },
];

const ExportData: React.FC<MainViewChildProps> = observer(({ vm }) => {
    return (
        <div className='rounded bg-gradient-to-r from-sky-500 to-indigo-500 p-1 hover:opacity-80 transition-all active:scale-90'>
            <button
                type='button'
                className='w-32 box-border p-1 pr-8 pl-8 self-center bg-white text-indigo-500
         shadow-md rounded outline-none transition-all hover:opacity-80 '
            >
                <CSVLink data={vm.data.slice()} headers={headers}>
                    Export
                </CSVLink>
            </button>
        </div>
    );
});

export default ExportData;
