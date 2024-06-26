import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AuthenticatedRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user?._id) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they log in, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/hub/getting-started" state={{ from: location }} replace />;
    }

    return children;

};

