import { AppBar, Toolbar, IconButton, Typography, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  userName: string;
  onLogout: () => void;
}

export default function HeaderMUI({ title, onMenuClick, userName, onLogout }: HeaderProps) {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1B8C3E' }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {userName && <Typography variant="body2">{userName}</Typography>}
          {onLogout && (
            <Button color="inherit" onClick={onLogout} sx={{ border: '1px solid rgba(255,255,255,0.3)' }}>
              Déconnexion
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}