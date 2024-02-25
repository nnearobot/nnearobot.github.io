export default function GlassPlate(WrappedComponent: React.ComponentType, className: string = '') {
    className = className || ""
    const ComponentGlassPlate = ({...props}) => {
        return (
            <div className={`p-8 rounded-xl border-1 bg-white/40 dark:bg-white/20 shadow-lg backdrop-blur ${className}`}>
                <WrappedComponent {...props} />
            </div>
        );
      };
      return ComponentGlassPlate;
};