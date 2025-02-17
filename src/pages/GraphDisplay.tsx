import React, { useContext } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectContext } from '../contexts/ProjectContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const GraphDisplay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useContext(ProjectContext);
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <Typography>プロジェクトが見つかりません</Typography>;
  }

  // recordsを日付順にソート
  const sortedRecords = [...project.records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
      <Box sx={{ 
        height: { xs: 300, sm: 400 },
        width: '100%',
        overflow: 'hidden'
      }}>
        <ResponsiveContainer width="100%" height="100%">
          {project.graphType === 'stackedLine' ? (
            <LineChart data={sortedRecords}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: project.unit, angle: -90, position: 'insideLeft' }} />
              <ChartTooltip />
              <Line type="monotone" dataKey="value" stroke="#2196F3" strokeWidth={2} />
            </LineChart>
          ) : project.graphType === 'bar' ? (
            <BarChart data={sortedRecords}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: project.unit, angle: -90, position: 'insideLeft' }} />
              <ChartTooltip />
              <Bar dataKey="value" fill="#2196F3" />
            </BarChart>
          ) : project.graphType === 'stackedBar' ? (
            <BarChart data={sortedRecords}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: project.unit, angle: -90, position: 'insideLeft' }} />
              <ChartTooltip />
              <Bar dataKey="value" fill="#2196F3" stackId="a" />
              <Bar dataKey="value" fill="#82ca9d" stackId="a" />
            </BarChart>
          ) : (
            <LineChart data={sortedRecords}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: project.unit, angle: -90, position: 'insideLeft' }} />
              <ChartTooltip />
              <Line type="monotone" dataKey="value" stroke="#2196F3" strokeWidth={2} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default GraphDisplay;
