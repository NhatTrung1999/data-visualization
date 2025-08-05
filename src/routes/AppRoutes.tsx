import { Navigate, Route, Routes } from 'react-router-dom';
import { DataVisualizationPage } from '../pages';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/data-visualization'} replace />} />
      <Route path="/data-visualization" element={<DataVisualizationPage />} />
    </Routes>
  );
};

export default AppRoutes;
