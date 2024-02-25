const Tri = ({...props}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800" className={props.className}>
            <defs>
                <filter id="neon-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feGaussianBlur stdDeviation="34 34" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
                </filter>
                <filter id="neon-filter2" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feGaussianBlur stdDeviation="18 18" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
                </filter>
            </defs>
            <g strokeWidth="34.5" stroke="" fill="none" transform="rotate(180, 400, 400)">
                <polygon points="400,92.5 92.5,625.1 707.5,625.1" filter="url(#neon-filter)"></polygon>
                <polygon points="410,92.5 102.5,625.1 717.5,625.1" filter="url(#neon-filter2)" opacity="0.14"></polygon>
                <polygon points="390,92.5 82.5,625.1 697.5,625.1" filter="url(#neon-filter2)" opacity="0.14"></polygon>
                <polygon points="400,92.5 92.5,625.1 707.5,625.1"></polygon>
            </g>
        </svg>
    );
};

export default Tri;