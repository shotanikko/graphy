import React, { useState, useContext } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProjectContext, GraphType } from '../contexts/ProjectContext';

const ProjectSetup = () => {
  const { addProject } = useContext(ProjectContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [graphType, setGraphType] = useState<GraphType>("line");
  const [unit, setUnit] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && unit) {
      addProject({ name, graphType, unit });
      navigate('/');
    }
  };

  return (
    <Box>
      <Typography 
        variant="h5" 
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        プロジェクト作成
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="プロジェクト名"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="graph-type-label">グラフの種類</InputLabel>
          <Select
            labelId="graph-type-label"
            value={graphType}
            label="グラフの種類"
            onChange={(e) => setGraphType(e.target.value as GraphType)}
            required
          >
            <MenuItem value="line">折れ線グラフ</MenuItem>
            <MenuItem value="stackedLine">積み上げ折れ線グラフ</MenuItem>
            <MenuItem value="bar">棒グラフ</MenuItem>
            <MenuItem value="stackedBar">積み上げ棒グラフ</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="単位"
          fullWidth
          margin="normal"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        />
        <Button 
          type="submit" 
          variant="contained"
          sx={{ 
            mt: 2,
            fontWeight: 'bold'
          }}
        >
          登録
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectSetup;
