import { createBrowserRouter, Navigate } from "react-router-dom";
import SplashPage from './pages/Splash';
import ReportsPage from './pages/ReportsPage';
import SetsPage from './pages/SetsPage';
import EditSet from './components/EditSet';
import StatsPage from './pages/StatsPage';
import GettingStartedPage from './pages/GettingStartedPage';
import ExercisesPage from './pages/ExercisePage';
import Layout from './layout/Layout';
import Login from './components/Login';
import { LoadClientData } from './loaders';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';

const CatchAll = () => {
    setTimeout(() => {
        return <Navigate to={'/work-report/hub'} />
    }, 2000);
}

const router = createBrowserRouter([
    { path: '/work-report', element: <SplashPage /> },
    {
        path: '/work-report/hub/', element: <Layout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'getting-started', element: <GettingStartedPage /> },
            { path: 'sets', element: <AuthenticatedRoute><SetsPage /> </AuthenticatedRoute> },
            { path: "sets/edit/:set_id", element: <EditSet /> },
            { path: 'stats', element: <AuthenticatedRoute><StatsPage /></AuthenticatedRoute> },
            { path: 'reports', element: <ReportsPage /> },
            { path: 'exercises', element: <ExercisesPage /> }
        ]
    }, { path: "*", element: <CatchAll /> }]);

export default router;