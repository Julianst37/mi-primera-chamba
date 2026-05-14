import { useState } from 'react';
import { useAssets } from '../../hooks/useAssets';
import { AssetForm } from './AssetForm';
import { ConfirmModal } from './ConfirmModal';
import BuscadorInteligente from './BuscadorInteligente';
import { useToast, ToastContainer } from './Toast';

export const Update = () => {
    const { assets, loading, error, editingItem, deleteAssetOptimistic, handleEdit, handleSearch, searchQuery, simulateError, setSimulateError } = useAssets();
    const { toasts, removeToast, success, error: errorToast } = useToast();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (id: string) => {
        setDeletingId(id);
        setIsOpenModal(true);
    };

    const handleConfirmDelete = async () => {
        if (deletingId) {
            try {
                setIsDeleting(true);
                await deleteAssetOptimistic(deletingId);
                setIsOpenModal(false);
                setDeletingId(null);
                success('Asset eliminado correctamente');
            } catch (err) {
                console.error('Error al eliminar:', err);
                errorToast('Error al eliminar el asset');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const handleCancelDelete = () => {
        setIsOpenModal(false);
        setDeletingId(null);
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Gestión de Assets</h1>

            {/* Toggle para simular error (Testing) */}
            <div style={{ 
                marginBottom: '1.5rem', 
                padding: '1rem', 
                backgroundColor: '#fff3cd', 
                border: '1px solid #ffc107',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <input
                    type="checkbox"
                    id="simulateError"
                    checked={simulateError}
                    onChange={(e) => setSimulateError(e.target.checked)}
                    style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                />
                <label htmlFor="simulateError" style={{ margin: 0, cursor: 'pointer', flex: 1 }}>
                     Simular error del servidor (para testing rollback)
                </label>
            </div>

            {/* Formulario */}
            <AssetForm editingItem={editingItem} onSuccess={success} onError={errorToast} />

            {/* Lista de Assets */}
            <div>
                <h2>Lista de Assets</h2>
                <BuscadorInteligente onSearch={handleSearch} searchQuery={searchQuery} />
                {loading && <p>Cargando assets...</p>}
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}

                {assets.length === 0 ? (
                    <p>No hay assets registrados</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left', borderRight: '1px solid #ddd' }}>Nombre</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', borderRight: '1px solid #ddd' }}>Cantidad</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', borderRight: '1px solid #ddd' }}>Fecha Creación</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assets.map((asset) => (
                                <tr key={asset.id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '0.75rem', borderRight: '1px solid #ddd' }}>{asset.name}</td>
                                    <td style={{ padding: '0.75rem', borderRight: '1px solid #ddd' }}>{asset.amount}</td>
                                    <td style={{ padding: '0.75rem', borderRight: '1px solid #ddd' }}>
                                        {new Date(asset.created_at).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>
                                        <button
                                            onClick={() => handleEdit(asset)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                marginRight: '0.5rem',
                                                backgroundColor: '#2196F3',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(asset.id)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: '#f44336',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal de Confirmación */}
            <ConfirmModal
                isOpen={isOpenModal}
                title="Confirmar Eliminación"
                message="¿Estás seguro de que quieres eliminar este asset? Esta acción no se puede deshacer."
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                confirmText={isDeleting ? 'Cargando...' : 'Eliminar'}
                cancelText="Cancelar"
                isLoading={isDeleting}
            />

            {/* Toast Container */}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
    );
};