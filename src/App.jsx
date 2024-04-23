import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExerciseList from './components/ExerciseList';
import Layout from './components/Layout';
import NoPage from './components/NoPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MealPlanner from './components/Meals';
import AddStats from './components/AddStats';
import AddSet from './components/AddSet';
import AddBodyFat from './components/AddBodyFat';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import { AuthProvider } from './hooks/useAuth';

import './App.scss';

function App() {
  return (
    <BrowserRouter basename="/work-report">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/exercises" element={<ExerciseList />} />
            <Route path="/programs" element={""} />
            <Route path="/stats" element={
              <AuthenticatedRoute>
                <AddStats />
              </AuthenticatedRoute>
            }
            />

            <Route path="/sets" element={
              <AuthenticatedRoute>
                <AddSet />
              </AuthenticatedRoute>
            } />
            <Route path="/reports" />
            <Route path="/body_fat" element={<AddBodyFat />} />
            <Route path="/mealplanner" element={<MealPlanner />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
