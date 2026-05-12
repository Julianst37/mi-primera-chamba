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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase';

// Schema de validación con Zod
const registerSchema = z
  .object({
    nombres: z
      .string()
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(50, 'El nombre no puede exceder 50 caracteres')
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
    apellidos: z
      .string()
      .min(2, 'El apellido debe tener al menos 2 caracteres')
      .max(50, 'El apellido no puede exceder 50 caracteres')
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras y espacios'),
    usuario: z
      .string()
      .min(3, 'El usuario debe tener al menos 3 caracteres')
      .max(50, 'El usuario no puede exceder 50 caracteres')
      .regex(/^[a-zA-Z0-9_]+$/, 'El usuario solo puede contener letras, números y guiones bajos'),
    correo: z
      .string()
      .email('Por favor ingresa un correo válido'),
    contraseña: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(100, 'La contraseña no puede exceder 100 caracteres')
      .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
      .regex(/[0-9]/, 'La contraseña debe contener al menos un número'),
    confirmarContraseña: z.string(),
  })
  .refine((data) => data.contraseña === data.confirmarContraseña, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmarContraseña'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      console.log('Datos del registro:', data);

      // Hashear la contraseña
      const hashedPassword = bcrypt.hashSync(data.contraseña, 10);

      // Guardar usuario en Supabase
      const { data: registeredUser, error: registerError } = await supabase
        .from('usuarios')
        .insert([
          {
            usuario: data.usuario,
            nombres: data.nombres,
            apellidos: data.apellidos,
            correo: data.correo,
            contraseña: hashedPassword,
            fecha_creacion: new Date().toISOString(),
          },
        ])
        .select();

      if (registerError) {
        if (registerError.code === '23505') {
          setErrorMessage('El usuario o correo ya está registrado.');
        } else {
          setErrorMessage(registerError.message || 'Error en el registro. Intenta nuevamente.');
        }
        console.error('Error de Supabase:', registerError);
        setIsLoading(false);
        return;
      }

      // Guardar usuario en contexto
      registerUser({
        usuario: data.usuario,
        nombres: data.nombres,
        apellidos: data.apellidos,
        correo: data.correo,
      });

      setSuccessMessage('¡Registro exitoso! Redirigiendo al inicio...');
      reset();

      // Redirigir al inicio después de 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setErrorMessage('Error en el registro. Intenta nuevamente.');
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
              bgcolor: 'success.main',
              width: 56,
              height: 56,
            }}
          >
            <PersonAddIcon />
          </Avatar>

          {/* Título */}
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Crear Cuenta
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
            {/* Campo Nombres */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombres"
              label="Nombres"
              autoComplete="given-name"
              autoFocus
              placeholder="Ingresa tus nombres"
              {...register('nombres')}
              error={!!errors.nombres}
              helperText={errors.nombres?.message}
              disabled={isLoading}
            />

            {/* Campo Apellidos */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="apellidos"
              label="Apellidos"
              autoComplete="family-name"
              placeholder="Ingresa tus apellidos"
              {...register('apellidos')}
              error={!!errors.apellidos}
              helperText={errors.apellidos?.message}
              disabled={isLoading}
            />

            {/* Campo Usuario */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Nombre de Usuario"
              autoComplete="username"
              placeholder="Ingresa tu nombre de usuario"
              {...register('usuario')}
              error={!!errors.usuario}
              helperText={errors.usuario?.message}
              disabled={isLoading}
            />

            {/* Campo Correo */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="correo"
              label="Correo Electrónico"
              type="email"
              autoComplete="email"
              placeholder="Ingresa tu correo"
              {...register('correo')}
              error={!!errors.correo}
              helperText={errors.correo?.message}
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
              autoComplete="new-password"
              placeholder="Ingresa tu contraseña"
              helperText="Mín. 6 caracteres, 1 mayúscula y 1 número"
              {...register('contraseña')}
              error={!!errors.contraseña}
              disabled={isLoading}
            />
            {errors.contraseña && (
              <Typography variant="caption" sx={{ color: 'error.main', display: 'block', mt: 0.5 }}>
                {errors.contraseña.message}
              </Typography>
            )}

            {/* Campo Confirmar Contraseña */}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirmar Contraseña"
              type="password"
              id="confirmarContraseña"
              autoComplete="new-password"
              placeholder="Confirma tu contraseña"
              {...register('confirmarContraseña')}
              error={!!errors.confirmarContraseña}
              helperText={errors.confirmarContraseña?.message}
              disabled={isLoading}
            />

            {/* Botón de Registro */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
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
                  Registrando...
                </>
              ) : (
                'Registrarse'
              )}
            </Button>

            {/* Pie de página */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                ¿Ya tienes cuenta?{' '}
                <Typography
                  component="span"
                  onClick={() => navigate('/login')}
                  sx={{
                    color: 'primary.main',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Inicia sesión aquí
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
