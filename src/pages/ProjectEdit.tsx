import React, { useState, useContext, useEffect } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectContext, GraphType } from '../contexts/ProjectContext';

const ProjectEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { projects, updateProject } = useContext(ProjectContext);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [graphType, setGraphType] = useState<GraphType>('line');

  // 既存のプロジェクト情報を取得
  useEffect(() => {
    const project = projects.find(p => p.id === id);
    if (project) {
      setName(project.name);
      setUnit(project.unit);
      setGraphType(project.graphType);
    }
  }, [id, projects]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updateProject(id, { name, unit, graphType });
      navigate('/');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="プロジェクト名"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="単位"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        required
      />
      <FormControl>
        <InputLabel>グラフタイプ</InputLabel>
        <Select
          value={graphType}
          onChange={(e) => setGraphType(e.target.value as GraphType)}
          label="グラフタイプ"
          required
        >
          <MenuItem value="line">折れ線グラフ</MenuItem>
          <MenuItem value="bar">棒グラフ</MenuItem>
          <MenuItem value="stackedLine">積み上げ折れ線グラフ</MenuItem>
          <MenuItem value="stackedBar">積み上げ棒グラフ</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        更新
      </Button>
    </Box>
  );
};

export default ProjectEdit; 