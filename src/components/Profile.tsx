import { useState, useRef } from 'react';
import { Paper, Box, Typography, Button, Avatar, CircularProgress, Alert, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { supabase } from '../supabase';
import { uploadToVault } from '../services/StorageService';

export default function Profile() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor selecciona una imagen válida');
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('La imagen no puede exceder 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    setUploadMessage('');
    setUploadProgress(0);

    try {
      // Usar el servicio de almacenamiento para subir la foto con progreso
      const fotoUrl = await uploadToVault(file, (progress) => {
        setUploadProgress(Math.round(progress));
      });

      // Actualizar la tabla de usuarios con la URL de la foto
      const { error: updateError } = await supabase
        .from('usuarios')
        .update({ foto: fotoUrl })
        .eq('usuario', user.usuario);

      if (updateError) {
        throw updateError;
      }

      // Actualizar el contexto con la nueva foto
      updateUser({ foto: fotoUrl });

      setUploadMessage('¡Foto de perfil actualizada exitosamente!');
      setTimeout(() => setUploadMessage(''), 3000);
    } catch (error) {
      console.error('Error al subir foto:', error);
      setUploadError('Error al subir la foto. Intenta nuevamente.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      // Limpiar el input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 120px)',
          p: 2,
          width: '100%',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5">Debes iniciar sesión para ver tu perfil</Typography>
          <Button variant="contained" onClick={() => navigate('/login')} sx={{ mt: 2 }}>
            Ir a Login
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 120px)',
        p: 2,
        width: '100%',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 'sm' }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          {/* Avatar */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar
              src={user.foto}
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'primary.main',
                fontSize: '3rem',
                mb: 2,
              }}
            >
              {user.nombres.charAt(0).toUpperCase()}
            </Avatar>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <Button
              variant="contained"
              size="small"
              startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? 'Subiendo...' : 'Cambiar Foto'}
            </Button>
            {isUploading && (
              <Box sx={{ width: '100%', mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress variant="determinate" value={uploadProgress} sx={{ flex: 1 }} />
                  <Typography variant="caption" sx={{ minWidth: '45px' }}>
                    {uploadProgress}%
                  </Typography>
                </Box>
              </Box>
            )}
            {uploadMessage && (
              <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
                {uploadMessage}
              </Alert>
            )}
            {uploadError && (
              <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                {uploadError}
              </Alert>
            )}
          </Box>

          <Typography variant="h5" sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold' }}>
            Mi Perfil
          </Typography>

          <Box sx={{ space: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
              <PersonIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Nombres
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user.nombres}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
              <PersonIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Apellidos
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user.apellidos}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
              <AccountCircleIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Nombre de Usuario
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user.usuario}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Correo Electrónico
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user.correo}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate('/')}
            sx={{ mt: 4 }}
          >
            Volver al Inicio
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
