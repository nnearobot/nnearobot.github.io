import { Exo_2 } from 'next/font/google'

const exo2 = Exo_2({
  weight: ['400'],
  subsets: ['latin']
})

const H2 = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props

    className = className || ""

    return (
        <h2 className={`mt-10 mb-3 text-nn-600 font-bold text-2xl ${className} ${exo2.className}`}>{ children }</h2>
    );
};

export default H2;