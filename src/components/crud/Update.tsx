import { useAssets } from '../../hooks/useAssets';
import { AssetForm } from './AssetForm';

export const Update = () => {
    const { assets, loading, error, editingItem, deleteAsset, handleEdit } = useAssets();

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este asset?')) {
            try {
                await deleteAsset(id);
            } catch (err) {
                console.error('Error al eliminar:', err);
            }
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Gestión de Assets</h1>

            {/* Formulario */}
            <AssetForm editingItem={editingItem} />

            {/* Lista de Assets */}
            <div>
                <h2>Lista de Assets</h2>

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
                                            onClick={() => handleDelete(asset.id)}
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
        </div>
    );
};