import React, { useContext } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectContext } from '../contexts/ProjectContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const GraphDisplay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useContext(ProjectContext);
  const project = projects.find(p => p.id === Number(id));

  if (!project) {
    return <Typography>プロジェクトが見つかりません</Typography>;
  }

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2 
      }}>
        <Box>
          <Typography 
            variant="h5" 
            sx={{ 
              fontFamily: '"M PLUS Rounded 1c", "Segoe UI", sans-serif',
              mb: 1
            }}
          >
            {project.name}
          </Typography>
          <Box sx={{ 
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            width: '100%'
          }} />
        </Box>
        <Tooltip title="データを追加">
          <IconButton
            color="primary"
            onClick={() => navigate(`/project/${id}/update`)}
          >
            <AddCircleIcon sx={{ fontSize: 70 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={project.records}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: project.unit, angle: -90, position: 'insideLeft' }} />
            <ChartTooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default GraphDisplay;
