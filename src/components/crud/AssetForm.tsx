import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Asset } from '../../types/Asset';
import { useAssets } from '../../hooks/useAssets';

interface AssetFormProps {
    editingItem: Asset | null;
}

export const AssetForm = ({ editingItem }: AssetFormProps) => {
    const { createAsset, updateAsset, cancelEdit, error } = useAssets();
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<Omit<Asset, 'id' | 'created_at'>>({
        defaultValues: {
            name: '',
            amount: 0,
            file_path: null
        }
    });

    useEffect(() => {
        if (editingItem) {
            reset({
                name: editingItem.name,
                amount: editingItem.amount,
                file_path: editingItem.file_path
            });
        } else {
            reset({
                name: '',
                amount: 0,
                file_path: null
            });
        }
    }, [editingItem, reset]);

    const onSubmit = async (data: Omit<Asset, 'id' | 'created_at'>) => {
        try {
            if (editingItem) {
                await updateAsset({
                    ...editingItem,
                    ...data
                });
            } else {
                await createAsset(data);
                reset({
                    name: '',
                    amount: 0,
                    file_path: null
                });
            }
        } catch (err) {
            console.error('Error al guardar:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
            <h3>{editingItem ? 'Editar Asset' : 'Crear Nuevo Asset'}</h3>

            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>Error: {error}</p>}

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="name">Nombre:</label>
                <input
                    id="name"
                    type="text"
                    {...register('name', { required: 'El nombre es requerido' })}
                    placeholder="Nombre del activo"
                    style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
                {errors.name && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.name.message}</span>}
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="amount">Cantidad:</label>
                <input
                    id="amount"
                    type="number"
                    step="0.01"
                    {...register('amount', { 
                        required: 'La cantidad es requerida',
                        valueAsNumber: true,
                        min: { value: 0, message: 'La cantidad debe ser mayor o igual a 0' }
                    })}
                    placeholder="Cantidad"
                    style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
                {errors.amount && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.amount.message}</span>}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {editingItem ? 'Guardar Cambios' : 'Crear Asset'}
                </button>
                {editingItem && (
                    <button
                        type="button"
                        onClick={cancelEdit}
                        style={{ padding: '0.5rem 1rem', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};
