import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as bcrypt from 'bcryptjs';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase';

// Schema de validación con Zod
const loginSchema = z.object({
  usuario: z
    .string()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(50, 'El usuario no puede exceder 50 caracteres'),
  contraseña: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede exceder 100 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      console.log('Datos del formulario:', data);

      // Buscar usuario en Supabase
      const { data: usuarios, error: searchError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('usuario', data.usuario)
        .limit(1);

      if (searchError) {
        console.error('Error en búsqueda:', searchError);
        setErrorMessage('Error en el servidor. Intenta nuevamente.');
        setIsLoading(false);
        return;
      }

      if (!usuarios || usuarios.length === 0) {
        setErrorMessage('Usuario o contraseña incorrectos.');
        console.log('Usuario no encontrado en BD');
        setIsLoading(false);
        return;
      }

      const usuario = usuarios[0];

      // Validar contraseña
      if (!bcrypt.compareSync(data.contraseña, usuario.contraseña)) {
        setErrorMessage('Usuario o contraseña incorrectos.');
        setIsLoading(false);
        return;
      }

      // Guardar usuario en contexto
      login({
        usuario: usuario.usuario,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        foto: usuario.foto || undefined,
      });

      setSuccessMessage('¡Login exitoso!');
      reset();

      // Redirigir al inicio después de 1 segundo
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setErrorMessage('Error en el login. Intenta nuevamente.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 2,
          }}
        >
          {/* Avatar con icono */}
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'primary.main',
              width: 56,
              height: 56,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>

          {/* Título */}
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Iniciar Sesión
          </Typography>

          {/* Mensajes de error o éxito */}
          {errorMessage && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          {/* Formulario */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            {/* Campo Usuario */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Usuario"
              autoComplete="username"
              autoFocus
              placeholder="Ingresa tu usuario"
              {...register('usuario')}
              error={!!errors.usuario}
              helperText={errors.usuario?.message}
              disabled={isLoading}
            />

            {/* Campo Contraseña */}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              id="contraseña"
              autoComplete="current-password"
              placeholder="Ingresa tu contraseña"
              {...register('contraseña')}
              error={!!errors.contraseña}
              helperText={errors.contraseña?.message}
              disabled={isLoading}
            />

            {/* Botón de Login */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: '1rem',
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </Button>

            {/* Pie de página */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                ¿No tienes cuenta?{' '}
                <Typography
                  component="span"
                  onClick={() => navigate('/registro')}
                  sx={{
                    color: 'primary.main',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Regístrate aquí
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
