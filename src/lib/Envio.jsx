const enviar = async () => {
  if (!montoBRL || isNaN(montoBRL)) {
    alert("⚠️ Ingresa un monto válido");
    return;
  }

  console.log("👉 Registrando envío..."); // Paso de control

  const { error } = await supabase.from("envios").insert([
    {
      nombre: cliente.nombre,
      cedula: cliente.cpf,
      telefono: cliente.telefono,
      monto_brl: parseFloat(montoBRL),
      fecha: new Date().toISOString()
    }
  ]);

  if (error) {
    console.error("❌ Error Supabase:", error);
    alert("❌ Error al guardar el envío");
  } else {
    console.log("✅ Envío registrado con éxito"); // Este debería salir si todo fue bien
    navigate("/panel"); // Aquí se hace el cambio de pantalla
  }
};