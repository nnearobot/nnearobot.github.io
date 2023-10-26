import { Exo_2 } from 'next/font/google'

const exo2 = Exo_2({
  weight: ['400'],
  subsets: ['latin']
})

const H3 = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props

    className = className || ""

    return (
        <h3 className={`font-bold text-xl ${className} ${exo2.className}`}>{ children }</h3>
    );
};

export default H3;