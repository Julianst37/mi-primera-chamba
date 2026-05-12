import { supabase } from '../supabase';

export const obtenerTransacciones = async () => {
  try {
    const { data, error } = await supabase
      .from('transacciones')
      .select('*');

    if (error) {
      console.error('Error al obtener transacciones:', error);
      throw error;
    }

    console.log('Transacciones obtenidas:', data);
    return data;
  } catch (error) {
    console.error('Error en obtenerTransacciones:', error);
    throw error;
  }
};

// Método alternativo con paginación
export const obtenerTransaccionesPaginado = async (desde = 0, hasta = 10) => {
  try {
    const { data, error } = await supabase
      .from('transacciones')
      .select('*')
      .range(desde, hasta);

    if (error) {
      console.error('Error al obtener transacciones paginadas:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error en obtenerTransaccionesPaginado:', error);
    throw error;
  }
};
