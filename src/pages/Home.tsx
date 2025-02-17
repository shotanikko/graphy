import React, { useContext, useState } from 'react';
import { Box, Card, Typography, IconButton, Stack, Tooltip, useMediaQuery, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../contexts/ProjectContext';

// Propsの型を定義
interface HomeProps {
  searchQuery: string;
}

const Home = ({ searchQuery }: HomeProps) => {
  const navigate = useNavigate();
  const { projects, deleteProject } = useContext(ProjectContext);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setProjectToDelete(projectId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (projectToDelete !== null) {
      deleteProject(projectToDelete);
    }
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {projects.length === 0 ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4">ようこそGraphyへ</Typography>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            右上の「プロジェクト作成」からプロジェクトを作成してください
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
                  justifyContent: 'space-between'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="グラフを見る">
                      <IconButton 
                        color="primary"
                        size={isSmallScreen ? 'medium' : 'large'}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/project/${project.id}`);
                        }}
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
                        fontSize: { xs: '1rem', sm: '1.25rem' }
                      }}
                    >
                      {project.name}
                    </Typography>
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
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1,
                    ml: 'auto'
                  }}>
                    <Tooltip title="データを追加">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/project/${project.id}/update`);
                        }}
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="プロジェクトを削除">
                      <IconButton
                        size="small"
                        color="inherit"
                        sx={{ color: 'rgba(0, 0, 0, 0.4)' }}
                        onClick={(e) => handleDeleteClick(e, project.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Card>
          ))}
        </Stack>
      )}

      {/* 削除確認ダイアログ */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>
          カードを削除してもいいですか？
        </DialogTitle>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialogOpen(false)}
            color="primary"
          >
            いいえ
          </Button>
          <Button 
            onClick={handleDeleteConfirm}
            color="primary"
            autoFocus
          >
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
