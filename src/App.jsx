import { AppProviders } from './app/AppProviders';
import { AppRoutes } from './app/AppRoutes';
import { AppToast } from './app/AppToast';

function App() {
  return (
    <AppProviders>
      <AppRoutes />
      <AppToast />
    </AppProviders>
  );
}

export default App;
