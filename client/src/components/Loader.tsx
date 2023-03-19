import SVGLoader from './SVGLoader';

const Loader = () => {
    return (
        <div className='bg-white opacity-80 flex justify-center items-center absolute top-0 left-0 w-full h-full'>
            <SVGLoader />
        </div>
    );
};

export default Loader;
