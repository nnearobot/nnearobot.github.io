const TextInput = ({...props}) => {
    const {
        className,
        ...rest
    } = props

    return (
        <input {...props} className={`w-full py-2 px-3 text-zinc-700 bg-white dark:bg-zinc-200 border border-zinc-200 outline-none focus:ring-2 focus:ring-zinc-400 shadow-sm rounded-lg ${className}`} />
    );
};

export default TextInput;