import { HashRouter, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
import NotFound from './pages/NotFound';
import TaxCalculator from './pages/tax_calculator/TaxCalculator';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<TaxCalculator />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
