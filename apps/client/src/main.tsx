import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, StyledEngineProvider, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const defaultTheme = createTheme();

root.render(
  <StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <App />
            </LocalizationProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>
);
