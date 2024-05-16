import BlurBackdrop from "./BlurBackdrop"

const LoadingSpinner = ({ hasBlur }) => {
    return (
        <>
            {hasBlur ? <BlurBackdrop /> : null}
            <div>
                <span className="loading-spinner" />
            </div>
        </>
    );
}

export default LoadingSpinner;