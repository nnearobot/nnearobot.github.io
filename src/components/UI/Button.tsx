import { Exo_2 } from 'next/font/google';

const exo2 = Exo_2({
    weight: ['400'],
    subsets: ['latin']
})

const Button = ({...props}) => {

    let {
        children,
        className,
        ...rest
    } = props;

    className = className || "";

    return (
        <button {...props} className={`px-5 py-1 border rounded-md font-bold md:text-lg capitalize ${exo2.className} bg-zinc-700 text-white active:bg-zinc-900 ${className}`}>
            {props.children}
        </button>
    );
};

export default Button;