import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import Home from './pages/Home';
import ProjectSetup from './pages/ProjectSetup';
import GraphDisplay from './pages/GraphDisplay';
import GraphUpdate from './pages/GraphUpdate';
import ProjectEdit from './pages/ProjectEdit';
import { ProjectContextProvider } from './contexts/ProjectContext';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ProjectContextProvider>
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} />} />
              <Route path="/project-setup" element={<ProjectSetup />} />
              <Route path="/project/:id" element={<GraphDisplay />} />
              <Route path="/project/:id/update" element={<GraphUpdate />} />
              <Route path="/project/:id/settings" element={<ProjectEdit />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ProjectContextProvider>
  );
}

export default App;