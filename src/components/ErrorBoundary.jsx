import React from 'react';

class ErrorBoundary extends React.Component {
    state = { hasError: false }

    static getDerivedStatedFromError(error) {
        return { hasError: true }
    }
    componentDidCatch(error, info) {
        // TODO Send log to Server
        console.log(error, info)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback
        }
        return this.props.children;
    }
}
export default ErrorBoundary;



/**
 * 
    <ErrorBoundary fallback="Error">
        <Suspense fallback="loading...">
            <Data type="Users" hasError />
        </Suspense>
    </ErrorBoundary>
 */