// Suscripción al boletín del pie de página.
// PENDIENTE: conectar con el servicio de correo del proyecto (Mailchimp, Brevo, etc.).
// Mientras tanto NO se guarda nada: solo se simula la respuesta para poder ver el diseño.
export async function subscribe(email) {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return { ok: Boolean(email) }
}
