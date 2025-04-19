import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import MainLayout from './components/layout/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import StudentList from './pages/students/StudentList';
import StudentDetail from './pages/students/StudentDetail';

// Lazy loaded pages for code splitting
const Courses = React.lazy(() => import('./pages/courses/CourseList'));
const CourseDetail = React.lazy(() => import('./pages/courses/CourseDetail'));
const Professors = React.lazy(() => import('./pages/professors/ProfessorList'));
const ProfessorDetail = React.lazy(() => import('./pages/professors/ProfessorDetail'));
const Enrollments = React.lazy(() => import('./pages/enrollments/EnrollmentList'));
const Marks = React.lazy(() => import('./pages/marks/MarksList'));
const Reports = React.lazy(() => import('./pages/Reports'));
const Settings = React.lazy(() => import('./pages/Settings'));

// Fallback for lazy loaded routes
const LazyFallback = () => (
  <div className="flex items-center justify-center h-full py-16">
    <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            
            {/* Student Routes */}
            <Route path="students" element={<StudentList />} />
            <Route path="students/:id" element={<StudentDetail />} />
            
            {/* Course Routes */}
            <Route 
              path="courses" 
              element={
                <React.Suspense fallback={<LazyFallback />}>
                  <Courses />
                </React.Suspense>
              } 
            />
            <Route 
              path="courses/:id" 
              element={
                <React.Suspense fallback={<LazyFallback />}>
                  <CourseDetail />
                </React.Suspense>
              } 
            />
            
            {/* Professor Routes */}
            <Route 
              path="professors" 
              element={
                <React.Suspense fallback={<LazyFallback />}>
                  <Professors />
                </React.Suspense>
              } 
            />
            <Route 
              path="professors/:id" 
              element={
                <React.Suspense fallback={<LazyFallback />}>
                  <ProfessorDetail />
                </React.Suspense>
              } 
            />
            
            {/* Other Routes */}
            <Route 
              path="enrollments" 
              element={
                <React.Suspense fallback={<LazyFallback />}>
                  <Enrollments />
                </React.Suspense>
              } 
            />
            <Route 
              path="marks" 
              element={
                <React.Suspense fallback={<LazyFallback />}>
                  <Marks />
                </React.Suspense>
              } 
            />
            <Route 
              path="reports" 
              element={
                <React.Suspense fallback={<LazyFallback />}>
                  <Reports />
                </React.Suspense>
              } 
            />
            <Route 
              path="settings" 
              element={
                <React.Suspense fallback={<LazyFallback />}>
                  <Settings />
                </React.Suspense>
              } 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;