import { createBrowserRouter } from "react-router-dom";
import SplashPage from './pages/Splash';
import ReportsPage from './pages/ReportsPage';
import SetsPage from './pages/SetsPage';
import StatsPage from './pages/StatsPage';
import GettingStartedPage from './pages/GettingStartedPage';
import ExercisesPage from './pages/ExercisePage';
import Layout from './layout/Layout';
import SignUp from "./components/SignUp";
import { setsLoader } from './loaders/setsLoader';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';

const router = createBrowserRouter([
    { path: '/work-report', element: <SplashPage /> },
    { path: '/sign-up', element: <SignUp /> },
    {
        path: '/work-report/hub/', element: <Layout />,
        children: [
            { path: 'getting-started', element: <GettingStartedPage /> },
            { path: 'sets/:sets_id', loader: (params) => setsLoader({ params }), element: <AuthenticatedRoute><SetsPage /> </AuthenticatedRoute>},
            { path: 'stats', element: <AuthenticatedRoute><StatsPage /></AuthenticatedRoute> },
            { path: 'reports', element: <ReportsPage /> },
            { path: 'exercises', element: <ExercisesPage /> }
        ]
    }]);

export default router;