import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import theme from './theme';
import '@fontsource/roboto';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <PersistGate loading={null} persistor={persistor}>
                <App />
              </PersistGate>
            </LocalizationProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>
);
