import { MainViewChildProps } from '../utils/types';
import ExportData from './ExportData';
import Fieldset from './Fieldset';

const Form: React.FC<MainViewChildProps> = ({ vm }) => {
    return (
        <form
            className='flex flex-col justify-center gap-2 bg-white p-4 shadow-md rounded max-w-2xl m-auto'
            onSubmit={(e) => {
                vm.handleSubmitForm(e);
            }}
        >
            <Fieldset vm={vm} />
            <div className='flex justify-around mt-3'>
                <ExportData vm={vm} />
                <button
                    type={'submit'}
                    className=' p-2 pr-8 pl-8 self-center bg-gradient-to-r from-sky-500 to-indigo-500
                                 text-white shadow-md rounded outline-none hover:opacity-80 transition-all active:scale-90'
                >
                    Generate
                </button>
            </div>
        </form>
    );
};

export default Form;
