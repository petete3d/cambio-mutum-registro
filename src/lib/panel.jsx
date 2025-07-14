import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jewaryuxrujpsgpoxgoq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impld2FyeXV4cnVqcHNncG94Z29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxOTAzOTgsImV4cCI6MjA2Nzc2NjM5OH0.JeuKtSCHqWmu9JsWFr1O0fzdQMnoqH7bDYX2Qkcr2Mk'
);

export default function Panel() {
  const [envios, setEnvios] = useState([]);

  useEffect(() => {
    const cargarEnvios = async () => {
      const { data, error } = await supabase
        .from('envios')
        .select('*')
        .order('fecha', { ascending: false });

      if (error) {
        console.error('❌ Error cargando envíos:', error);
      } else {
        setEnvios(data);
      }
    };

    cargarEnvios();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2 style={{ textAlign: 'center' }}>📊 Panel de Control - Envíos</h2>
      {envios.length === 0 ? (
        <p style={{ textAlign: 'center' }}>⚠️ No hay envíos registrados aún.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Cédula</th>
              <th style={thStyle}>Teléfono</th>
              <th style={thStyle}>Monto (BRL)</th>
              <th style={thStyle}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {envios.map((envio, index) => (
              <tr key={index} style={{ textAlign: 'center' }}>
                <td style={tdStyle}>{envio.nombre}</td>
                <td style={tdStyle}>{envio.cedula}</td>
                <td style={tdStyle}>{envio.telefono}</td>
                <td style={tdStyle}>{envio.monto_brl.toFixed(2)}</td>
                <td style={tdStyle}>{new Date(envio.fecha).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  border: '1px solid #ccc',
  padding: '10px',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
};
