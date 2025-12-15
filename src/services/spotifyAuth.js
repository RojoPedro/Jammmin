// src/utils/spotifyAuth.js

// ----------------------------------------------------
// 1. COSTANTI E ENDPOINTS (Mantieni questa parte)
// ----------------------------------------------------
const clientId = "4b4e226938f9419898454598f89f2324";
const redirectUri = "https://spotifynd.netlify.app/";
const scope = "playlist-modify-public playlist-modify-private user-read-private"; // Aggiunto user-read-private per completezza
const authUrl = "https://accounts.spotify.com/authorize";
const tokenUrl = "https://accounts.spotify.com/api/token";
// ... (altri endpoints) ...

// ----------------------------------------------------
// 2. FUNZIONI DI SUPPORTO PER PKCE (Mantieni, ma non esportare)
// ----------------------------------------------------
const generateRandomString = (length) => {
  // ... (tua implementazione) ...
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = window.crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// ----------------------------------------------------
// 3. FUNZIONI ESPORTATE (IL CUORE DEL FLUSSO)
// ----------------------------------------------------

/**
 * Funzione 1: Avvia il login e reindirizza l'utente.
 * @export
 */
export async function redirectToAuthCodeFlow() {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed); // CODE CHALLENGE COMPLETATA

  // Salva il verifier per quando l'utente torna (sessionStorage è più sicuro per il singolo tab)
  sessionStorage.setItem('code_verifier', codeVerifier);

  const params =  new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  });

  window.location.href = `${authUrl}?${params.toString()}`;
  // IL CODICE SI FERMA QUI E LA PAGINA RICARICA SU SPOTIFY!
}


/**
 * Funzione 2: Scambia il codice per l'Access Token al ritorno.
 * @param {string} code - Il codice di autorizzazione ricevuto nell'URL.
 * @returns {string} L'Access Token.
 * @export
 */
export async function getAccessToken(code) {
  // stored in the previous step (usiamo sessionStorage per coerenza con il salvataggio)
  const codeVerifier = sessionStorage.getItem('code_verifier');
  
  if (!codeVerifier) {
      throw new Error("Code Verifier mancante. Riavviare il login.");
  }

  const payload = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  }

  // Chiamata all'endpoint del token
  const response = await fetch(tokenUrl, payload);
  
  if (!response.ok) {
     const errorBody = await response.json();
     throw new Error(`Scambio Token fallito: ${response.status} - ${errorBody.error_description || response.statusText}`);
  }

  const data = await response.json();

  // Salva il token e il tempo di scadenza (cruciale)
  const expirationTime = Date.now() + data.expires_in * 1000;
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('token_expiration', expirationTime);
  // Puliamo il verifier (chiave monouso)
  sessionStorage.removeItem('code_verifier');

  return data.access_token;
}

// Esporta anche le funzioni API per il prossimo passo

