# PLAN ULEPSZEŃ - ST KRAKOS

**Data:** 2025-01-27  
**Status:** 📋 Plan gotowy do realizacji  
**Zasada:** Minimalizacja kodu, bez rozpisywania

---

## ✅ CO JUŻ ZOSTAŁO ZROBIONE

### Faza 1: Bezpieczeństwo ✅
- ✅ SECRET_KEY walidacja
- ✅ CORS configuration
- ✅ Sanityzacja OpenAI
- ✅ Timeout handling

### Faza 2: User Experience ✅
- ✅ Loading states
- ✅ Error handling
- ✅ API client

### Faza 3: Wydajność ✅
- ✅ Cache dla AI Service
- ✅ Content visibility

### Faza 4: Jakość ✅
- ✅ Structured logging
- ✅ Test coverage ulepszone

---

## 🎯 ULEPSZENIA DO ZROBIENIA

### 1. RETRY LOGIC DLA API ✅ WAŻNE

**Cel:** Automatyczne ponowne próby przy błędach tymczasowych

**Plik:** `frontend/src/utils/api.js`

**Zmiana:** Dodanie retry logic z exponential backoff

**Wpływ:** Lepsze UX przy problemach sieciowych

---

### 2. REQUEST IDS W LOGOWANIU ✅ WAŻNE

**Cel:** Śledzenie requestów przez request_id

**Plik:** `backend/utils/logger.py`

**Zmiana:** Dodanie request_id do logów

**Wpływ:** Łatwiejsze debugowanie

---

### 3. ACCESSIBILITY (A11Y) - PODSTAWY ✅ ŚREDNIE

**Cel:** Podstawowe wsparcie accessibility

**Pliki:** 
- `frontend/src/pages/home.js`
- `frontend/src/styles/main.css`

**Zmiany:**
- ARIA labels dla przycisków
- Focus indicators
- Keyboard navigation

**Wpływ:** Lepsza dostępność

---

### 4. ERROR CODES ✅ ŚREDNIE

**Cel:** Bardziej szczegółowe komunikaty błędów

**Plik:** `backend/api/routes.py`

**Zmiana:** Dodanie error codes do odpowiedzi

**Wpływ:** Łatwiejsze debugowanie

---

### 5. API KEY AUTHENTICATION ⚠️ WYSOKIE (OPCJONALNE)

**Cel:** Ochrona API przed nadużyciem

**Pliki:**
- `backend/api/routes.py`
- `backend/middleware/`

**Zmiana:** Dodanie autoryzacji przez API key

**Wpływ:** Bezpieczeństwo API

---

## 📋 PRIORYTETYZACJA

### 🔴 WYSOKIE (Zrobić Najpierw)
1. Retry Logic dla API - poprawia UX
2. Request IDs - ułatwia debugowanie

### 🟠 ŚREDNIE (Wkrótce)
3. Accessibility - ważne dla użytkowników
4. Error Codes - ułatwia debugowanie

### 🟡 OPCJONALNE
5. API Key Authentication - jeśli API będzie publiczne

---

**Status:** ✅ Plan gotowy  
**Następny krok:** Implementacja ulepszeń

