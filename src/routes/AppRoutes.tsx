import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import Dashboard from '../pages/Dashboard';
import ChartsView from '../pages/Charts';
import { DataVisualizationPage } from '../pages';
// import { DataVisualizationPage } from '../pages';

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route
        path="/"
        element={<Navigate to={'/data-visualization'} replace />}
      />
      <Route path="/data-visualization" element={<DataVisualizationPage />} /> */}
      <Route path="/data-visualization" element={<DataVisualizationPage />} />
      <Route element={<AppLayout />}>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/charts" element={<ChartsView />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
