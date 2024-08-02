import { HashRouter, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
import { Provider } from 'react-redux';
import NotFound from './pages/NotFound';
import TaxCalculator from './pages/tax_calculator/TaxCalculator';
import { store } from './store/Store';

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
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  );
}
