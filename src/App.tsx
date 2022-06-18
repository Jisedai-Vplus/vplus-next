import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewView from './pages/view';
import ContributeView from './pages/contribute';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <BrowserRouter>
          <Routes>
            <Route path="/view" element={<ViewView />}></Route>
            <Route path="/contribute" element={<ContributeView />}></Route>
          </Routes>
        </BrowserRouter>
      </Grid>
    </Box>
  </ChakraProvider>
);
