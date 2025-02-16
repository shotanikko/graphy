import React, { useContext } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Stack, Tooltip, useMediaQuery } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../contexts/ProjectContext';

// Propsの型を定義
interface HomeProps {
  searchQuery: string;
}

const Home = ({ searchQuery }: HomeProps) => {
  const navigate = useNavigate();
  const { projects } = useContext(ProjectContext);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {projects.length === 0 ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4">ようこそGraphyへ</Typography>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            右上の「作成」からプロジェクトを作成してください
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {filteredProjects.map(project => (
            <Card 
              key={project.id}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                },
                transition: 'background-color 0.3s',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                // ボタンがクリックされた場合は、カードのクリックイベントを発火させない
                if ((e.target as HTMLElement).closest('button')) {
                  return;
                }
                navigate(`/project/${project.id}`);
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                p: { xs: 0.5, sm: 1 }, // モバイルではパディングを小さく
                flexDirection: { xs: 'column', sm: 'row' } // モバイルでは縦並び
              }}>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: { xs: 'space-between', sm: 'flex-start' }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="グラフを見る">
                      <IconButton 
                        color="primary"
                        size={isSmallScreen ? 'medium' : 'large'}
                      >
                        <BarChartIcon sx={{ 
                          fontSize: { xs: 35, sm: 50 }
                        }} />
                      </IconButton>
                    </Tooltip>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: '"M PLUS Rounded 1c", "Segoe UI", sans-serif',
                        fontSize: { xs: '1rem', sm: '1.25rem' } // モバイルではフォントを小さく
                      }}
                    >
                      {project.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="プロジェクト設定">
                      <IconButton
                        size="small"
                        color="inherit"
                        sx={{ color: 'rgba(0, 0, 0, 0.4)' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/project/${project.id}/settings`);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Home;
