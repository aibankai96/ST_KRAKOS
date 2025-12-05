# 🚀 Tworzenie Frontendu jako Static Site na Render

**Status:** Backend działa ✅  
**Problem:** Frontend nie jest wdrożony ❌

---

## 📋 KROK PO KROKU - Utworzenie Frontendu

### KROK 1: Otwórz Render Dashboard

1. Przejdź do: https://dashboard.render.com
2. Zaloguj się

---

### KROK 2: Utwórz Nowy Static Site

1. Kliknij **"New +"** (w prawym górnym rogu)
2. Wybierz **"Static Site"** (NIE Web Service!)

⚠️ **WAŻNE:** Musisz wybrać **"Static Site"**, nie "Web Service"!

---

### KROK 3: Połączenie z Repozytorium

1. **Connect account** (jeśli jeszcze nie połączone):
   - Wybierz **GitHub**
   - Autoryzuj dostęp do repozytorium

2. **Select repository:**
   - Wybierz: `aibankai96 / ST_KRAKOS`
   - Lub użyj: `https://github.com/aibankai96/ST_KRAKOS`

---

### KROK 4: Konfiguracja Static Site

Wypełnij formularz **dokładnie** tak:

#### **Name:**
```
st-krakos-frontend
```

#### **Branch:**
```
cleanup/safe-2025
```

#### **Root Directory:**
```
frontend
```
⚠️ **WAŻNE:** Musi być `frontend` (nie puste!)

#### **Build Command:**
```
npm install && RENDER=true npm run build:prod
```

#### **Publish Directory:**
```
dist
```
⚠️ **WAŻNE:** Musi być `dist` (nie `frontend/dist`!)

---

### KROK 5: Environment Variables

Kliknij **"Add Environment Variable"** i dodaj **WSZYSTKIE** trzy:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `RENDER` | `true` |
| `VITE_API_URL` | `https://st-krakos.onrender.com/api` |

⚠️ **WAŻNE:** 
- `VITE_API_URL` musi kończyć się na `/api`
- Zastąp `st-krakos.onrender.com` swoim rzeczywistym URL backendu (jeśli jest inny)

---

### KROK 6: Create Static Site

1. Sprawdź wszystkie pola jeszcze raz
2. Kliknij **"Create Static Site"**
3. Poczekaj na wdrożenie (~3-7 minut)

---

## ⏱️ Czas Wdrożenia

- Build: ~2-5 minut
- Deploy: ~1-2 minuty
- **Razem:** ~3-7 minut

---

## ✅ Po Wdrożeniu

### 1. Sprawdź URL Frontendu

Render wygeneruje URL typu:
```
https://st-krakos-frontend.onrender.com
```

**To jest URL który powinieneś otwierać w przeglądarce!**

### 2. Zaktualizuj CORS w Backendzie

W Render Dashboard → Backend (`ST_KRAKOS`) → Settings → Environment Variables:

1. Znajdź `CORS_ORIGINS`
2. Kliknij **"Edit"**
3. Zmień na:
   ```
   https://st-krakos-frontend.onrender.com
   ```
   (lub dodaj oba URL-e oddzielone przecinkiem)
4. Zapisz

### 3. Przetestuj Aplikację

1. Otwórz URL frontendu w przeglądarce
2. Sprawdź czy strona się ładuje
3. Sprawdź czy puzzle loader działa
4. Sprawdź czy nawigacja działa

---

## 🔍 Troubleshooting

### Problem: Build się nie powodzi
- Sprawdź logi w Render (Build Logs)
- Upewnij się, że `Root Directory` = `frontend`
- Sprawdź czy `Build Command` jest poprawny

### Problem: Strona jest pusta
- Sprawdź czy `Publish Directory` = `dist`
- Sprawdź logi builda

### Problem: Błędy CORS
- Zaktualizuj `CORS_ORIGINS` w backendzie na URL frontendu

---

## 📋 Checklista Przed Utworzeniem

- [ ] Masz dostęp do Render Dashboard
- [ ] Repozytorium `aibankai96 / ST_KRAKOS` jest dostępne
- [ ] Branch `cleanup/safe-2025` istnieje
- [ ] Znasz URL backendu: `https://st-krakos.onrender.com`

---

## 📝 Notatki

- **Backend URL:** `https://st-krakos.onrender.com`
- **Frontend URL:** (będzie po wdrożeniu)
- **API Endpoint:** `https://st-krakos.onrender.com/api`

---

**Powodzenia! 🚀**

Po utworzeniu frontendu będziesz miał dwa serwisy:
- ✅ Backend (Web Service) - `https://st-krakos.onrender.com`
- ✅ Frontend (Static Site) - `https://st-krakos-frontend.onrender.com`

