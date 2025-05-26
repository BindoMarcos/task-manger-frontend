import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Button variant='contained' onClick={handleLogout}>
      Cerrar sesión
    </Button>
  );
};

export default LogoutButton;
