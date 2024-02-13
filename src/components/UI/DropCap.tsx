import { Exo_2 } from 'next/font/google'

const exo2 = Exo_2({
  weight: ['700'],
  subsets: ['latin']
})

const DropCap = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props

    className = className || ""

    return (
        <span className={`font-bold text-xl capitalize ${className} ${exo2.className}`}>{ children }</span>
    );
};

export default DropCap;