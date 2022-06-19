import * as React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewView from './pages/view';
import MainView from './pages/main';

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
        </BrowserRouter>
      </Grid>
    </Box>
  </ChakraProvider>
);
