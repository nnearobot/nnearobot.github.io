import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./DownloadCVBtn.module.scss";

import urls from '../../data/urls';

const DownloadCVBtn = () => {
    return (
        <a className={styles.cvBtn} href={urls.cv.url} title={urls.cv.title} download>
            <FontAwesomeIcon icon={faCloudArrowDown} />
            <span>Download CV</span>
        </a>
    );
};

export default DownloadCVBtn;