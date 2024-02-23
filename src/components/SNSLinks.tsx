import { snsLinks } from '@/data/links';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SNSLinks = ({...props}) => {
    let {
        colors,
        ...rest
    } = props;

  return (
    snsLinks.map((item, idx) => {
        return (
            <a key={idx} href={item.url} title={ item.title } className={`${colors} block md:inline-block md:ml-4`}>
                <FontAwesomeIcon icon={item.icon} className="text-2xl md:text-xl" />
            </a>
        )
    })
  )
};

export default SNSLinks;