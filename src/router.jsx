import React, { Suspense } from 'react';
import { createHashRouter, useNavigate } from "react-router-dom";
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import EditStats from "./components/EditStats";
import EditSet from './components/EditSet';
import SplashPage from './pages/SplashPage';
import SetsPage from './pages/SetsPage';
import StatsPage from './pages/StatsPage';
import ReportsPage from './pages/ReportsPage';
import ExercisesPage from './pages/ExercisePage';
import GettingStartedPage from './pages/GettingStartedPage';
import Layout from './layout/Layout';

const CatchAll = () => {
  const navigate = useNavigate();
  setTimeout(()=> navigate('/hub/getting-started'), 2000);
}

const router = createHashRouter(
    [
        { basename: '/work-report', path: '/', element: <SplashPage /> },
        {
            path: '/hub', element: <Suspense><Layout /></Suspense>,
            children: [
                { path: 'getting-started', element: <GettingStartedPage /> },
                { path: 'sets', element: <AuthenticatedRoute><SetsPage /> </AuthenticatedRoute> },
                { path: "sets/edit/:set_id", element: <EditSet /> },
                { path: "stats", element: <AuthenticatedRoute><StatsPage /></AuthenticatedRoute> },
                { path: 'stats/edit/:stat_id', element: <EditStats /> },
                { path: 'reports', element: <ReportsPage /> },
                { path: 'exercises', element: <ExercisesPage /> }
            ]
        }, { path: "*", element: <CatchAll /> }
    ])

export default router;