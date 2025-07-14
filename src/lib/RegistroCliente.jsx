import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jewaryuxrujpsgpoxgoq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impld2FyeXV4cnVqcHNncG94Z29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxOTAzOTgsImV4cCI6MjA2Nzc2NjM5OH0.JeuKtSCHqWmu9JsWFr1O0fzdQMnoqH7bDYX2Qkcr2Mk'
);

export default function RegistroCliente() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();

  const registrar = async () => {
    if (!nombre || !telefono || !correo || !cpf) {
      alert('Por favor completa todos los campos');
      return;
    }

    const { error } = await supabase.from('clientes').insert([
      { nombre, telefono, correo, cpf }
    ]);

    if (error) {
      console.error(error);
      alert('❌ Error al registrar: ' + error.message);
    } else {
      alert('✅ Cliente registrado correctamente');
      navigate('/envio');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20, textAlign: 'center' }}>
      <h2>📝 Registro de Cliente</h2>
      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
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
        type="email"
        placeholder="Correo electrónico"
        value={correo}
        onChange={e => setCorreo(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <input
        type="text"
        placeholder="CPF"
        value={cpf}
        onChange={e => setCpf(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <button
        onClick={registrar}
        style={{ width: '100%', padding: 10, backgroundColor: '#28a745', color: 'white', border: 'none' }}
      >
        Continuar
      </button>
    </div>
  );
}
