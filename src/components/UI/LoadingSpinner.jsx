import BlurBackdrop from "./BlurBackdrop"

const LoadingSpinner = () => {
    return (
        <>
            <BlurBackdrop />
            <div>
                <span className="loading-spinner" />
            </div>
        </>
    );
}

export default LoadingSpinner;