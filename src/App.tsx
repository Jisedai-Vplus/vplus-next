import { Box, ChakraProvider, Grid, theme } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContributeView from './pages/contribute';
import LoginView from './pages/login';
import MainView from './pages/main';
import RegisterView from './pages/register';
import UserView from './pages/user';
import ViewView from './pages/view';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={0}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainView />}></Route>
          </Routes>
          <Routes>
            <Route path="/view" element={<ViewView />}></Route>
          </Routes>
          <Routes>
            <Route path="/contribute" element={<ContributeView />}></Route>
          </Routes>
          <Routes>
            <Route path="/register" element={<RegisterView />}></Route>
          </Routes>
          <Routes>
            <Route path="/login" element={<LoginView />}></Route>
          </Routes>
          <Routes>
            <Route path="/mecontrol" element={<UserView />}></Route>
          </Routes>
        </BrowserRouter>
      </Grid>
    </Box>
  </ChakraProvider>
);
