import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // ⬅️ AGGIUNGI QUESTO BLOCCO 
  server: {
    // La porta che stai usando (5173 è il default di Vite)
    port: 5173, 
    // Indica a Vite di accettare connessioni da questo dominio esterno
    allowedHosts: [
      'unconversant-milton-untraitorously.ngrok-free.dev', 
      // Se vuoi, puoi aggiungere anche il vecchio 127.0.0.1 per sicurezza:
      '127.0.0.1' 
    ]
  }
  // ⬆️ FINE BLOCCO DA AGGIUNGERE
});