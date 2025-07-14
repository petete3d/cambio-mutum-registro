import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jewaryuxrujpsgpoxgoq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impld2FyeXV4cnVqcHNncG94Z29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxOTAzOTgsImV4cCI6MjA2Nzc2NjM5OH0.JeuKtSCHqWmu9JsWFr1O0fzdQMnoqH7bDYX2Qkcr2Mk'
);

// 💱 Tasa de cambio fija por ahora
const TASA_CAMBIO = 6.2;

export default function Envio() {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [monto_brl, setMontoBrl] = useState('');
  const [monto_bs, setMontoBs] = useState(0);

  // ⚙️ Actualiza Bs automáticamente
  useEffect(() => {
    const brl = parseFloat(monto_brl);
    if (!isNaN(brl)) {
      setMontoBs(brl * TASA_CAMBIO);
    } else {
      setMontoBs(0);
    }
  }, [monto_brl]);

  const enviar = async () => {
    if (!nombre || !cedula || !telefono || !monto_brl) {
      alert('Por favor completa todos los campos');
      return;
    }

    const fecha = new Date().toISOString();

    const { error } = await supabase.from('envios').insert([
      { nombre, cedula, telefono, monto_brl: parseFloat(monto_brl), fecha }
    ]);

    if (error) {
      console.error(error);
      alert('❌ Error al registrar el envío: ' + error.message);
    } else {
      alert('✅ Envío registrado correctamente');
      // puedes redirigir a otra pantalla si deseas
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20, textAlign: 'center' }}>
      <h2>📤 Envío de Dinero</h2>
      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <input
        type="text"
        placeholder="Cédula"
        value={cedula}
        onChange={e => setCedula(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <input
        type="tel"
        placeholder="Teléfono"
        value={telefono}
        onChange={e => setTelefono(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <input
        type="number"
        placeholder="Monto en BRL"
        value={monto_brl}
        onChange={e => setMontoBrl(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <p><strong>Recibirás aproximadamente:</strong> {monto_bs.toFixed(2)} Bs</p>
      <button
        onClick={enviar}
        style={{ width: '100%', padding: 10, backgroundColor: '#007bff', color: 'white', border: 'none' }}
      >
        Confirmar Envío
      </button>
    </div>
  );
}