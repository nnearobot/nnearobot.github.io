import { Major_Mono_Display } from 'next/font/google';

const majorMonoDisplay = Major_Mono_Display({
    weight: ['400'],
    subsets: ['latin']
  })
  
const H1 = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props;

    className = className || "";

    return (
        <h1 className={`mb-5 font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl text-center capitalize ${className} ${majorMonoDisplay.className}`}>{ children }</h1>
    );
};

export default H1;