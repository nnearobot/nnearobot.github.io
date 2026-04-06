import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import styles from "./CanvasOverlayLayout.module.scss";

const CanvasOverlayLayout = ({
    children,
    overlay,
    className = "",
    frameClassName = "",
    overlayClassName = "",
    width = "1400px",
    height = "800px",
    defaultOverlayOpen = true,
    toggleOpenLabel = "Show overlay panel",
    toggleCloseLabel = "Hide overlay panel",
}) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(defaultOverlayOpen);

    const style = useMemo(
        () => ({
            "--canvas-overlay-layout-width": width,
            "--canvas-overlay-layout-height": height,
        }),
        [height, width]
    );

    const layoutClassName = [styles.layout, className].filter(Boolean).join(" ");
    const canvasFrameClassName = [styles.canvasFrame, frameClassName].filter(Boolean).join(" ");
    const overlayPanelClassName = [styles.overlay, overlayClassName].filter(Boolean).join(" ");

    return (
        <div className={layoutClassName} style={style}>
            <div className={canvasFrameClassName}>
                {children}
            </div>

            {overlay && isOverlayOpen && (
                <div className={overlayPanelClassName}>
                    {overlay}
                </div>
            )}

            {overlay && (
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={() => setIsOverlayOpen((prev) => !prev)}
                    aria-expanded={isOverlayOpen}
                    aria-label={isOverlayOpen ? toggleCloseLabel : toggleOpenLabel}
                >
                    <FontAwesomeIcon icon={isOverlayOpen ? faXmark : faBars} />
                </button>
            )}
        </div>
    );
};

export default CanvasOverlayLayout;
