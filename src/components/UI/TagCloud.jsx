import styles from "./TagCloud.module.scss";

const TagCloud = ({ tags, className = "", ...rest }) => {
    return (
        <div className={`${styles.tagCloud} ${className}`} {...rest}>
            {tags.sort((a, b) => a.title.localeCompare(b.title)).map((tag, idx) => {
                let sizeClass = styles.sizeBase;
                switch (tag.level) {
                    case 1:
                        sizeClass = styles.sizeXs; break;
                    case 2:
                        sizeClass = styles.sizeSm; break;
                    case 3:
                        sizeClass = styles.sizeBase; break;
                    case 4:
                        sizeClass = styles.sizeLg; break;
                    case 5:
                    case "top":
                        sizeClass = styles.sizeXl; break;
                    default:
                        sizeClass = styles.sizeBase;
                }

                let variantClass = "";
                if (tag.level === 4) variantClass = styles.variantL4;
                if (tag.level === 5 || tag.level === "top") variantClass = styles.variantTop;

                const classNames = [styles.tag, sizeClass, variantClass].filter(Boolean).join(" ");

                return (
                    <span key={idx} className={classNames}>
                        {tag.title}
                    </span>
                );
            })}
        </div>
    );
};

export default TagCloud;
