import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

const QuestionCircle = ({...props}) => {
    const { title, ...rest} = props;

    return (
        <span title={title} className="cursor-help" {...rest}>
            <FontAwesomeIcon icon={faQuestionCircle} />
        </span>
    );
};

export default QuestionCircle;