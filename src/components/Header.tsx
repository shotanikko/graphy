import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
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

  // ホームボタンを表示する条件を追加
  const showHomeButton = !isHome;

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
          minHeight: { xs: 60, sm: 80 }, // モバイルでは高さを小さく
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
            width: { xs: '150px', sm: '200px' } // モバイルでは幅を小さく
          }}
          onClick={() => navigate('/')}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: '"M PLUS Rounded 1c", "Segoe UI", sans-serif',
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '2rem' }, // モバイルではフォントサイズを小さく
              letterSpacing: '0.1em'
            }} 
          >
            Graphy
          </Typography>
          <TrendingUpIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} />
        </Box>
        {isHome && (
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center',
            px: { xs: 1, sm: 2 } // モバイルではパディングを小さく
          }}>
            <TextField
              size="small"
              placeholder="プロジェクトを検索"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              sx={{
                width: { xs: '200px', sm: '300px' }, // モバイルでは幅を小さく
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
          </Box>
        )}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          alignItems: 'center',
          width: '200px',
          mr: 2
        }}>
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
          {showHomeButton && (
            <Tooltip title="ホームに戻る">
              <IconButton
                color="inherit"
                onClick={() => navigate('/')}
                sx={{ color: 'white' }}
              >
                <HomeIcon sx={{ fontSize: '2rem' }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
