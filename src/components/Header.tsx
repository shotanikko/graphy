import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNavigate, useLocation } from 'react-router-dom';

// 検索用のPropsの型を定義
interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  // アップデート画面、グラフ表示画面、プロジェクト作成画面をチェック
  const shouldHideButton = location.pathname.includes('/update') || 
    location.pathname.match(/^\/project\/\d+$/) ||
    location.pathname === '/project-setup';

  return (
    <AppBar 
      position="static"
      sx={{ 
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        padding: { xs: '10px 0', sm: '10px 20px' } // モバイルとPCでのパディングを調整
      }}
    >
      <Toolbar 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between', // 左右の要素を均等に配置
          minHeight: 80,
        }}
      >
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: '"M PLUS Rounded 1c", "Segoe UI", sans-serif',
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '2rem' }, // フォントサイズをレスポンシブに
              letterSpacing: '0.1em'
            }} 
          >
            Graphy
          </Typography>
          <TrendingUpIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '200px', mr: 2 }}>
          {!shouldHideButton && (
            <Button 
              variant="contained"
              onClick={() => navigate('/project-setup')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              <Typography variant="button" sx={{ display: { xs: 'none', sm: 'block' }, fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                プロジェクト作成
              </Typography>
              <Typography variant="button" sx={{ display: { xs: 'block', sm: 'none' }, fontSize: '0.8rem' }}>
                作成
              </Typography>
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
