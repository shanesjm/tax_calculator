import { HashRouter, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
import { Provider } from 'react-redux';
import NotFound from './pages/NotFound';
import TaxCalculator from './features/tax_calculate/components/tax_calculator/TaxCalculator';
import { store } from './store/Store';
import Tax from './pages/Tax';

function App() {
  return (
    <Provider store={store}>
      <TaxCalculator />
    </Provider>
  );
}

export default App;
