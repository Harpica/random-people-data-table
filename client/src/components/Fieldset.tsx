import { MainViewChildProps } from '../utils/types';
import SVGRandom from './SVGRandom';

const Fieldset: React.FC<MainViewChildProps> = ({ vm }) => {
    return (
        <fieldset>
            <div className='flex justify-between'>
                <label htmlFor='region'>Choose data region:</label>
                <select
                    id='region'
                    name='region'
                    onChange={(e) => {
                        vm.region = e.currentTarget.value;
                    }}
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
                    defaultValue={0}
                    step={0.25}
                    onChange={(e) => {
                        vm.setErrNumber = e.currentTarget.value;
                    }}
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
                    step={0.25}
                    value={vm.errNumber}
                    onChange={(e) => {
                        vm.setErrNumber = e.currentTarget.value;
                    }}
                    className='ml-3 bg-inherit border-b  border-indigo-500 outline-none hover:opacity-60'
                />
            </div>
            <div className='flex justify-between'>
                <label htmlFor='seed'>Enter seed for randomization:</label>
                <button
                    type='button'
                    aria-label='random seed'
                    className='w-6 ml-3'
                    onClick={() => {
                        vm.setSeed = vm.generateSeed();
                    }}
                >
                    <SVGRandom />
                </button>
                <input
                    id={'seed'}
                    type={'text'}
                    value={vm.seed}
                    onChange={(e) => {
                        vm.setSeed = e.currentTarget.value;
                    }}
                    className='ml-3 bg-inherit border-b  border-indigo-500 outline-none hover:opacity-60'
                ></input>
            </div>
        </fieldset>
    );
};

export default Fieldset;
