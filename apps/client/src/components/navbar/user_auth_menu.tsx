import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { User } from '../../types/user';

interface UserMenuProps {
  auth: {
    user: User | null;
  };
  anchorElUser: null | HTMLElement;
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
  handleLogout: () => void;
  handleLogin: () => void;
}

const UserAuthMenu: React.FC<UserMenuProps> = ({
  auth,
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
  handleLogout,
  handleLogin,
}) => {
  return auth.user ? (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={auth.user.name} src={auth.user.name} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  ) : (
    <Button onClick={handleLogin} sx={{ my: 1, color: 'white' }} variant="text">
      Login
    </Button>
  );
};

export default UserAuthMenu;
