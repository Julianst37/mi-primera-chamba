import React from 'react';

interface BuscadorInteligenteProps {
    onSearch: (query: string) => void;
    searchQuery: string;
}

function BuscadorInteligente({ onSearch, searchQuery }: BuscadorInteligenteProps) {
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar..."
                onChange={onSearchChange}
                value={searchQuery}
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginBottom: '1rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    fontSize: '1rem'
                }}
            />
        </div>
    );
}

export default BuscadorInteligente;