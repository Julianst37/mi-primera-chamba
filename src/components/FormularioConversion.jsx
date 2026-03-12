import { useState } from 'react';

function FormularioConversion() {
  const [divisa, setDivisa] = useState('Dólar');
  const [valor, setValor] = useState('');

  const opciones = ['Dólar', 'Euro', 'Yen'];

  const handleConvertir = () => {
    if (valor === '') {
      alert('Por favor ingresa un valor a convertir');
      return;
    }
    console.log(`Convertir ${valor} de ${divisa}`);
    alert(`Conversion: ${valor} ${divisa}`);
  };

  return (
    <section id="convertir-divisas">
      <form className="conversion-divisas" onSubmit={(e) => e.preventDefault()}>
        <h3 id="titulo-formulario">Convertir divisas</h3>

        <label htmlFor="divisa">Moneda</label>
        <select
          id="divisa"
          value={divisa}
          onChange={(e) => setDivisa(e.target.value)}
        >
          {opciones.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>

        <label htmlFor="valor">Valor</label>
        <input
          id="valor"
          type="number"
          placeholder="ingrese valor a convertir.."
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <button
          id="boton-convertir"
          type="button"
          onClick={handleConvertir}
        >
          Convertir
        </button>
      </form>
    </section>
  );
}

export default FormularioConversion;
