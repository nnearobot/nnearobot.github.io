import { snsLinks } from '@/data/links';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SNSLinks = ({...props}) => {

    let {
        className,
        expanded,
        ...rest
    } = props;

    className = className || "";

    return (
        snsLinks.map((item, idx) => {
            return (
                <a key={idx} href={item.url} title={ item.title } className={`block md:inline-block md:ml-4 no-underline ${className}`}>
                    <FontAwesomeIcon icon={item.icon} className="text-xl !align-[-.18em]" />{expanded ? ` ${item.label}` : ''}
                </a>
            )
        })
    )
};

export default SNSLinks;