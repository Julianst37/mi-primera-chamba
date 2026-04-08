import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import { Typography } from '@mui/material';
import { CarritoContext } from './CarritoContext';
import { useContext } from 'react';

function ConfirmacionPago({setModalOpen}) {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const { limpiarCarrito } = useContext(CarritoContext);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (success) {
      const successTimer = setTimeout(() => {
        setSuccess(false);
        setModalOpen(false);
        limpiarCarrito();
      }, 2000);
      return () => clearTimeout(successTimer);
    }
  }, [success]);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, minWidth: 260 }}>
      <Typography variant="h6" gutterBottom>
        {success ? '¡Pago exitoso!' : 'Procesando pago...'}
      </Typography>
      <Box sx={{ mt: 2, position: 'relative', display: 'flex', justifyContent: 'center' }}>
        {loading && (
          <CircularProgress size={80} sx={{ color: green[500] }} />
        )}
        {success && (
          <CheckIcon color="success" sx={{ fontSize: 80 }} />
        )}
      </Box>
    </Box>
  );
}

export default ConfirmacionPago;