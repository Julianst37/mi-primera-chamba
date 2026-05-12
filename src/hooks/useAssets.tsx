import { useState, useEffect } from 'react';
import type { Asset } from '../types/Asset';
import { supabase } from '../supabase';

export const useAssets = () => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [editingItem, setEditingItem] = useState<Asset | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        createAsset,
        updateAsset,
        deleteAsset,
        handleEdit,
        cancelEdit,
        fetchAssets
    };
};