# 🧪 Test API URL w Frontendzie

## Problem
Frontend może używać nieprawidłowego URL do backendu.

## Rozwiązanie Testowe

Dodaj tymczasowy console.log w `frontend/src/utils/api.js` aby zobaczyć jaki URL jest używany:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Tymczasowy log do diagnostyki
console.log('🔍 API_BASE_URL:', API_BASE_URL)
console.log('🔍 VITE_API_URL env:', import.meta.env.VITE_API_URL)
```

**Po dodaniu:**
1. Zbuduj frontend: `npm run build:prod`
2. Wdróż na Render
3. Sprawdź konsolę przeglądarki (F12)
4. Zobacz jaki URL jest używany

---

## Alternatywne Rozwiązanie

Jeśli `VITE_API_URL` nie działa, możesz użyć bezpośredniego URL w kodzie:

```javascript
// Tymczasowo - dla testów
const API_BASE_URL = window.location.hostname.includes('render.com') 
  ? 'https://st-krakos.onrender.com/api'
  : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api')
```

**UWAGA:** To jest rozwiązanie tymczasowe! Lepiej użyć Environment Variables.

