import { useState, useEffect } from 'react';
import type { Asset } from '../types/Asset';
import { supabase } from '../supabase';

export const useAssets = () => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [editingItem, setEditingItem] = useState<Asset | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [simulateError, setSimulateError] = useState(false); // Para testing

    // Cargar assets al montar el componente
    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data, error: fetchError } = await supabase
                .from('assets')
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;
            setAssets(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar assets');
        } finally {
            setLoading(false);
        }
    };

    const createAsset = async (assetData: Omit<Asset, 'id' | 'created_at'>) => {
        try {
            setError(null);
            const { data, error: createError } = await supabase
                .from('assets')
                .insert([assetData])
                .select();

            if (createError) throw createError;
            if (data) {
                setAssets(prevAssets => [data[0], ...prevAssets]);
            }
            return data?.[0];
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al crear asset';
            setError(message);
            throw err;
        }
    };

    const updateAsset = async (updatedAsset: Asset) => {
        try {
            setError(null);
            const { name, amount } = updatedAsset;
            const { data, error: updateError } = await supabase
                .from('assets')
                .update({ name, amount })
                .eq('id', updatedAsset.id)
                .select();

            if (updateError) throw updateError;
            
            setAssets(prevAssets => prevAssets.map(a => a.id === updatedAsset.id ? data[0] : a));
            setEditingItem(null);
            return data?.[0];
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al actualizar asset';
            setError(message);
            throw err;
        }
    };

    const deleteAsset = async (id: string) => {
        try {
            setError(null);
            const { error: deleteError } = await supabase
                .from('assets')
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;
            setAssets(prevAssets => prevAssets.filter(a => a.id !== id));
            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al eliminar asset';
            setError(message);
            throw err;
        }
    };

    const deleteAssetOptimistic = async (id: string) => {
        try {
            setError(null);
            
            // Guardar el asset actual para rollback
            const assetToDelete = assets.find(a => a.id === id);
            if (!assetToDelete) throw new Error('Asset no encontrado');

            // Actualización optimista: eliminar inmediatamente de la UI
            setAssets(prevAssets => prevAssets.filter(a => a.id !== id));

            // Simular error del servidor si está habilitada la flag
            if (simulateError) {
                throw new Error('Error simulado del servidor - Rollback activado');
            }

            // Intentar eliminar en Supabase
            const { error: deleteError } = await supabase
                .from('assets')
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;
            return true;
        } catch (err) {
            // Rollback: restaurar el asset eliminado
            setAssets(prevAssets => {
                const assetToRestore = assets.find(a => a.id === id);
                if (assetToRestore) {
                    return [assetToRestore, ...prevAssets];
                }
                return prevAssets;
            });

            const message = err instanceof Error ? err.message : 'Error al eliminar asset';
            setError(message);
            throw err;
        }
    };

    const handleSearch = async (query: string) => {
        try {
            setError(null);
            setSearchQuery(query);

            if (!query.trim()) {
                await fetchAssets();
                return;
            }

            // Búsqueda por nombre
            const { data: nameResults, error: nameError } = await supabase
                .from('assets')
                .select('*')
                .ilike('name', `%${query}%`)
                .order('created_at', { ascending: false });

            if (nameError) throw nameError;

            // Intentar búsqueda por cantidad si es un número
            let amountResults: Asset[] = [];
            const queryNumber = parseFloat(query);
            
            if (!isNaN(queryNumber)) {
                const { data: results, error: amountError } = await supabase
                    .from('assets')
                    .select('*')
                    .eq('amount', queryNumber)
                    .order('created_at', { ascending: false });

                if (amountError) throw amountError;
                amountResults = results || [];
            }

            // Combinar resultados sin duplicados
            const combinedResults = [
                ...nameResults || [],
                ...amountResults.filter(item => 
                    !(nameResults || []).some(n => n.id === item.id)
                )
            ];

            setAssets(combinedResults);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al buscar assets';
            setError(message);
            throw err;
        }
    };

    const handleEdit = (item: Asset) => {
        setEditingItem(item);
    };

    const cancelEdit = () => {
        setEditingItem(null);
    };

    return {
        assets,
        editingItem,
        loading,
        error,
        searchQuery,
        createAsset,
        updateAsset,
        deleteAsset,
        deleteAssetOptimistic,
        handleEdit,
        cancelEdit,
        handleSearch,
        fetchAssets,
        simulateError,
        setSimulateError
    };
};