import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import { Save, Visibility, VisibilityOff } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { changePassword } from '../api';

const Settings = () => {
  const { user } = useAuth();
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saving, setSaving] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setSaving(true);

    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      toast.success('Contraseña actualizada correctamente');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      const message = error.response?.data?.error || 'Error al cambiar la contraseña';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Configuración
      </Typography>

      <Grid container spacing={3}>
        {/* User Info */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Información del Usuario
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Nombre"
                  value={user?.name || ''}
                  disabled
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={user?.email || ''}
                  disabled
                />
                <TextField
                  fullWidth
                  label="Rol"
                  value={user?.role || ''}
                  disabled
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Change Password */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cambiar Contraseña
              </Typography>
              <Box
                component="form"
                onSubmit={handlePasswordSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <TextField
                  fullWidth
                  label="Contraseña actual"
                  name="currentPassword"
                  type={showPasswords ? 'text' : 'password'}
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPasswords(!showPasswords)}
                          edge="end"
                        >
                          {showPasswords ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Nueva contraseña"
                  name="newPassword"
                  type={showPasswords ? 'text' : 'password'}
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Confirmar nueva contraseña"
                  name="confirmPassword"
                  type={showPasswords ? 'text' : 'password'}
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  error={
                    passwordForm.confirmPassword !== '' &&
                    passwordForm.newPassword !== passwordForm.confirmPassword
                  }
                  helperText={
                    passwordForm.confirmPassword !== '' &&
                    passwordForm.newPassword !== passwordForm.confirmPassword
                      ? 'Las contraseñas no coinciden'
                      : ''
                  }
                />
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Save />}
                  disabled={saving}
                >
                  {saving ? 'Guardando...' : 'Cambiar Contraseña'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* URLs Info */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                URLs del Sistema
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                Estas son las URLs de acceso a los diferentes servicios de Intercel
              </Alert>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Sitio Público"
                    value="https://intercel.entersys.mx"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Panel Admin"
                    value="https://admin.intercel.entersys.mx"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="API"
                    value="https://api.intercel.entersys.mx"
                    disabled
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
