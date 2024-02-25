import { Key } from "react";

const TagCloud = ({...props}) => {
    let {
        tags,
        className,
        ...rest
    } = props;

    className = className || "";

    return (
        <div className={`tag-cloud ${className}`}>
            {
                tags.map((tag: { level: any; title: string; }, idx: Key | null | undefined) => {
                    let size = "base";
                    let additional = "";
                    switch (tag.level) {
                        case 1:
                            size = "xs";
                            break;
                        case 2:
                            size = "sm";
                            break;
                        case 3:
                            size = "base";
                            break;
                        case 4:
                            size = "lg";
                            additional = "border border-solid border-zinc-300 dark:border-zinc-500 bg-white/40 dark:bg-zinc-500/40 rounded-md px-1 my-1"
                            break;
                        case 5:
                        case "top":
                            size = "xl";
                            additional = "border border-solid border-zinc-400 bg-white dark:bg-zinc-500 dark:text-white rounded-md px-2 my-1"
                            break;
                        default:
                            size = "base";
                    }

                    return (
                        <span key={idx} className={`inline-block me-2 text-${size} ${additional}`}>{ tag.title }</span>
                    )
                })
            }
        </div>
    );
};

export default TagCloud;