import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';

// 検索用のPropsの型を定義
interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const Header = ({ searchQuery = '', onSearchChange }: HeaderProps) => {
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
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
      }}
    >
      <Toolbar 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          minHeight: 80, // 固定の高さに戻す
          py: 1
        }}
      >
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            ml: 2,
            width: { xs: 'auto', sm: '200px' } // モバイルでは自動幅
          }}
          onClick={() => navigate('/')}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: '"M PLUS Rounded 1c", "Segoe UI", sans-serif',
              fontWeight: 700,
              fontSize: '2rem', // 固定サイズに戻す
              letterSpacing: '0.1em'
            }} 
          >
            Graphy
          </Typography>
          <TrendingUpIcon sx={{ fontSize: '2.5rem' }} /> {/* 固定サイズに戻す */}
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          {isHome && (
            <TextField
              size="small"
              placeholder="プロジェクトを検索"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              sx={{
                width: '300px', // 固定幅に戻す
                backgroundColor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  height: 40,
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
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
              プロジェクト作成
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
