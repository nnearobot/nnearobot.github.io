import TextInput from "./TextInput";

const InputWithSide = ({...props}) => {
    let {
        side,
        sideLabel,
        ...rest
    } = props

    side = side || 'right';

    return (
        <div className="flex items-center text-zinc-500">
            {side == 'left' ? <div className={`px-3 py-2 rounded-l-lg bg-zinc-100 border-l border-y border-zinc-200 shadow-sm`}>{sideLabel}</div> : ''}
            <TextInput 
                type="text" {...rest} 
                className={`z-[1] ${side == 'left' ? 'rounded-none rounded-r-lg' : 'rounded-none rounded-l-lg'}`}
            />
            {side == 'right' ? <div className={`px-3 py-2 rounded-r-md bg-zinc-100 dark:bg-zinc-400 text-zinc-500 dark:text-zinc-700 border-r border-y border-zinc-200 shadow-sm`}>{sideLabel}</div> : ''}
        </div>
    );
};

export default InputWithSide;