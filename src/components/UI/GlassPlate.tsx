export default function GlassPlate(WrappedComponent: React.ComponentType, className: string = '') {
    className = className || ""
    const ComponentGlassPlate = ({...props}) => {
        return (
            <div className={`p-8 rounded-xl border-1 bg-white/40 shadow-lg backdrop-blur ${className}`}>
                <WrappedComponent {...props} />
            </div>
        );
      };
      return ComponentGlassPlate;
};