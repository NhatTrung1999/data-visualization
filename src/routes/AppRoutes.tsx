import { Navigate, Route, Routes } from 'react-router-dom';
// import { DataVisualizationPage } from '../pages';
import AppLayout from '../layout/AppLayout';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route
        path="/"
        element={<Navigate to={'/data-visualization'} replace />}
      />
      <Route path="/data-visualization" element={<DataVisualizationPage />} /> */}
      <Route element={<AppLayout />}>
        <Route index path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
